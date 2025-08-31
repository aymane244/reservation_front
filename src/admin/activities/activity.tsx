import { useEffect, useState } from "react";
import { firstLetterCapital } from "../../../public/helpers";
import Header from "../dashboard/partials/header";
import axiosInstance from "../../features/auth/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import adminAxios from "../../features/auth/adminAxios";

interface Activities{
    id: number,
    name: string,
    status: number
}

interface Plan {
    id: number;
    name: string;
    activity_id: number;
}

interface Feature {
    key?: string;
    value?: number;
    limit?: string | null;
    description: string;
}

export default function AdminActivities(){
    const [activities, setActivities] = useState<Activities[]>([]);
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [currentActivityId, setCurrentActivityId] = useState<number | null>(null);
    const [planName, setPlanName] = useState("");
    const [plans, setPlans] = useState<Plan[]>([]);
    const [features, setFeatures] = useState<{ description: string; limit: number | null; value:number }[]>([{ description: "", limit: null, value: 1 },]);
    const [planPrice, setPlanPrice] = useState<number>(0);

    const handleFeatureChange = (index: number, value: string) => {
        setFeatures(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                description: value,
            };
            return updated;
        });
    };

    const addFeatureInput = () => {
        setFeatures(prev => [...prev, { description: "", limit: null, value: 1 }]);
    };

    const removeFeatureInput = (index: number) => {
        setFeatures(prev => prev.filter((_, i) => i !== index));
    };

    const addActivity = async () => {
        if (!newName.trim()) return;

        try {
            const res = await adminAxios.post('api/admin/activities', { name: newName });
            if(res.status === 200){
                setActivities((prev) => [...prev, res.data.activity]);
                setNewName("");
            }
        } catch (error) {
            console.error("Error adding activity:", error);
        }
    };

    const updateActivity = async (id: number) => {
        if (!editingName.trim()) return;

        try {
            const res = await adminAxios.post(`api/admin/activities/${id}`, { name: editingName });
            if(res.status === 200){
                setActivities((prev) =>
                    prev.map((a) => (a.id === id ? res.data.activity : a))
                );

                setEditingId(null);
                setEditingName("");
            }
        } catch (error) {
            console.error("Error updating activity:", error);
        }
    };

    const toggleStatus = async (id: number, currentStatus: number) => {
        try{
            const res = await adminAxios.post(`api/admin/ctivities-status/${id}`, {
                status: currentStatus === 1 ? 0 : 1,
            });

            if(res.status === 200){
                // Update the activity status in local state
                setActivities((prev) => prev.map((a) => a.id === id ? { ...a, status: res.data.activity.status } : a));
            }
        }catch(error){
            console.error("Error toggling status:", error);
        }
    };

    const deleteActivity = async (id: number) => {
        try{
            const result = await Swal.fire({
                title: 'Êtes-vous sûr ?',
                text: "Cette action supprimera l'activité définitivement.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Oui, supprimer',
                cancelButtonText: 'Annuler',
            });

            if(result.isConfirmed){
                const res = await adminAxios.post(`api/admin/activities-delete/${id}`);

                if(res.status === 200){
                    setActivities((prev) => prev.filter((a) => a.id !== id));

                    Swal.fire({
                        icon: 'success',
                        title: 'Supprimé',
                        text: "L'activité a été supprimée.",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                }
            }
        }catch(error){
            console.error("Error deleting activity:", error);

            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: "La suppression a échoué. Veuillez réessayer.",
            });
        }
    };

    useEffect(() => {
        const getActivity = async () => {
            const response = await adminAxios.get("api/admin/activities/get");
                
            if(response.status === 200){
                setActivities(response.data.activities);
            }
        }
    
        getActivity()
    }, []);

    const openPlanModal = (activityId: number) => {
        setCurrentActivityId(activityId);
        setPlanName("");
        setFeatures([{ description: "", limit: null, value: 1 }]); // reset with one empty input
        setShowPlanModal(true);
    };

    const closePlanModal = () => {
        setShowPlanModal(false);
        setCurrentActivityId(null);
        setPlanName("");
    };

    const addPlanToActivity = async () => {
        if (!planName.trim() || currentActivityId === null) return;

        // Remove empty descriptions
        const filteredFeatures = features
        .filter(f => f.description.trim() !== "")
        .map(f => ({
            description: f.description.trim(),
            key: f.description.trim().toLowerCase().replace(/\s+/g, "_"),
            value: f.value ?? 0, // 1 if checked, 0 if unchecked
            limit: f.limit ?? null,
        }));
        
        try{
            const res = await adminAxios.post('api/admin/activities/add-plan', {
                name: planName,
                price: planPrice,
                activity_id: currentActivityId,
                features: filteredFeatures,
            });
            
            if (res.status === 200) {
                setPlans(prev => [...prev, res.data.plan]);
                Swal.fire({
                    icon: "success",
                    title: "Plan ajouté",
                    text: `Le plan "${planName}" a été ajouté avec ses fonctionnalités.`,
                    timer: 1500,
                    showConfirmButton: false,
                });
                closePlanModal();
            }
        } catch (error) {
            console.error("Error adding plan:", error);
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Impossible d'ajouter le plan, veuillez réessayer.",
            });
        }
    };
    
    return (
        <div className="w-85 container-fluid">
            <Header/>
            <div className="container-fluid mt-3">
                <h2 className="my-4">Activités</h2>

                {/* Add New Activity */}
                <div className="mt-5 border bg-white p-3 rounded">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nouvelle activité"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <button className="btn btn-success" onClick={addActivity}>
                            Ajouter
                        </button>
                    </div>

                    {/* Activities Table */}
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Activité</th>
                                <th>Statut</th>
                                <th style={{ width: "150px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map((activity) => (
                                <tr key={activity.id}>
                                    <td>{activity.id}</td>
                                    <td>
                                        {editingId === activity.id ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                            />
                                        ) : (
                                            activity.name
                                        )}
                                    </td>
                                    <td>
                                        {editingId === activity.id ? (
                                            <div className="form-check form-switch">
                                                <input 
                                                    className="form-check-input" 
                                                    type="checkbox" 
                                                    role="switch" 
                                                    id={`activate-${activity.id}`}
                                                    checked={activity.status === 1}
                                                    onChange={() => toggleStatus(activity.id, activity.status)}
                                                />
                                            </div>
                                        ) : (
                                            activity.status === 1 ? "Active" : "Inactive"
                                        )}
                                    </td>
                                    <td>
                                        {editingId === activity.id ? (
                                            <>
                                                <button
                                                    className="btn btn-primary btn-sm me-2"
                                                    onClick={() => updateActivity(activity.id)}
                                                >
                                                    Sauvearder
                                                </button>
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditingName("");
                                                    }}
                                                >
                                                    Annuler
                                                </button>
                                            </>
                                        ) : (
                                            <div className="d-flex justify-content-center">
                                                <FontAwesomeIcon
                                                    icon={faPen}
                                                    className="text-success fs-5 pointer"
                                                    onClick={() => {
                                                        setEditingId(activity.id);
                                                        setEditingName(activity.name);
                                                    }}
                                                />
                                                { activity.name === "contrôle technique" ? "" :    
                                                    <FontAwesomeIcon
                                                        icon={faTrashAlt}
                                                        className="text-danger fs-5 ms-3 pointer"
                                                        onClick={() => deleteActivity(activity.id)}
                                                    />
                                                }
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    className="text-primary fs-5 ms-3 pointer"
                                                    title="Ajouter un plan"
                                                    onClick={() => openPlanModal(activity.id)}
                                                />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {activities.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center">
                                        Pas d'activités trouvés.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {showPlanModal && (
                    <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Ajouter un plan</h5>
                                    <button type="button" className="btn-close" onClick={closePlanModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="form-label">Nom du plan</label>
                                                <input
                                                    type="text"
                                                    className="form-control mb-3"
                                                    placeholder="Nom du plan"
                                                    value={planName}
                                                    onChange={(e) => setPlanName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Prix du plan</label>
                                                <input
                                                    type="number"
                                                    className="form-control mb-3"
                                                    placeholder="Prix du plan"
                                                    value={planPrice}
                                                    min={0}
                                                    onChange={(e) => setPlanPrice(Number(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <label className="form-label">Fonctionnalités</label>
                                    </div>
                                    {features.map((feature, index) => (
                                        <div key={index} className="mb-2 flex gap-2 items-center">
                                            {/* Description */}
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={`Fonctionnalité #${index + 1}`}
                                                            value={feature.description}
                                                            onChange={(e) => {
                                                                const updated = [...features];
                                                                updated[index].description = e.target.value;
                                                                setFeatures(updated);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="Limit"
                                                            value={feature.limit ?? ""}
                                                            onChange={(e) => {
                                                                const updated = [...features];
                                                                updated[index].limit = e.target.value ? Number(e.target.value) : null;
                                                                setFeatures(updated);
                                                            }}
                                                        />
                                                    </div>
                                                    {/* <div className="col-md-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={feature.value === 1}
                                                            onChange={(e) => {
                                                                const updated = [...features];
                                                                updated[index].value = e.target.checked ? 1 : 0;
                                                                setFeatures(updated);
                                                            }}
                                                        />
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={addFeatureInput}
                                    >
                                        + Ajouter une fonctionnalité
                                    </button>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closePlanModal}>
                                        Annuler
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={addPlanToActivity}>
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}