import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import axiosInstance from "../../../features/auth/axiosInstance";
import Swal from "sweetalert2";

interface Plan{
    id: number,
    name: string,
    price: number,
    features: Features[],
}

interface Features{
    id: number,
    key: string,
    value: number,
    description: string,
    limit?: string;
    features: [],
}

interface PlanComponent{
    plan : Plan | null
}

export default function Plan({plan} : PlanComponent){
    const [formData, setFormData] = useState<Plan | null>(null);

    useEffect(() => {
        if (plan) setFormData(plan);
    }, [plan]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        const { id, value } = e.target;
        
        setFormData({ ...formData, [id]: id === "price" ? parseFloat(value) : value });
    };

    const handleFeatureChange = (index: number, field: keyof Features, value: any) => {
        if (!formData) return;

        const updatedFeatures = [...formData.features];

        updatedFeatures[index] = {
            ...updatedFeatures[index],
            [field]: value,
        };

        if (field === "description") {
            updatedFeatures[index].key = value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_")
            .replace(/[^\w_]/g, "");
        }

        setFormData({ ...formData, features: updatedFeatures });
    };

    const handleAddFeature = () => {
        if (!formData) return;
        
        const newFeature: Features = {
            id: 0,
            key: "",      
            value: 0,
            description: "",
            limit: "",
            features: [],
        };

        setFormData({
            ...formData,
            features: [...formData.features, newFeature],
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post(`/api/plans/${formData?.id}`, formData);

            console.log("Plan updated", response.data);
            Swal.fire({
                icon: 'success',
                title: 'Succès',
                text: 'Le plan a été mis à jour avec succès.',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error("Update failed", error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: "Échec de la mise à jour du plan. Veuillez réessayer.",
                confirmButtonText: 'Fermer',
            });
        }
    };

    const handleDeleteFeature = async (index: number) => {
        if (!formData) return;

        const featureToDelete = formData.features[index];

        try{
            const result = await Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Cette action supprimera la fonctionnalité définitivement.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
        });

        if(result.isConfirmed){
            // Call API to delete feature from backend by ID
            await axiosInstance.delete(`/api/plan-features/${featureToDelete.id}`);

            // Remove feature from state so UI updates immediately
            const updatedFeatures = [...formData.features];
            updatedFeatures.splice(index, 1);
            setFormData({ ...formData, features: updatedFeatures });

            Swal.fire({
                icon: 'success',
                title: 'Supprimé',
                text: 'La fonctionnalité a été supprimée.',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    }catch(error){
        console.error('Erreur lors de la suppression:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: "La suppression a échoué. Veuillez réessayer.",
            });
        }
    };
    console.log(plan);
    
    return(
        <div className="mt-4">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="name">Nom du plan</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            value={formData?.name || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="price">Prix du plan</label>
                        <input
                            id="price"
                            type="number"
                            min="0"
                            className="form-control"
                            value={formData?.price || 0}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mt-3 col-12">
                        <div className="d-flex align-items-start w-100">
                            <label className="w-100">Descriptions</label>
                            <label className="w-100 ms-3">Limit</label>
                            <label className="w-100 text-center">Activer</label>
                        </div>

                        {formData?.features.map((feature, index) => (
                            <div className="d-flex align-items-start justify-content-between mt-2" key={feature.id}>
                                <div className="d-flex align-items-start w-100">
                                    <textarea
                                        className="form-control w-100"
                                        value={feature.description}
                                        onChange={(e) =>
                                            handleFeatureChange(index, "description", e.target.value)
                                        }
                                    />
                                    <input
                                        type="text"
                                        className="form-control mx-2 w-100"
                                        value={feature.limit ?? "-"}
                                        onChange={(e) =>
                                            handleFeatureChange(index, "limit", e.target.value)
                                        }
                                    />
                                    <input
                                        type="checkbox"
                                        className="w-100"
                                        checked={feature.value === 1}
                                        onChange={(e) =>
                                            handleFeatureChange(index, "value", e.target.checked ? 1 : 0)
                                        }
                                    />
                                </div>
                                <div>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className={`text-danger pointer ${formData.features.length === 1 ? 'disabled' : ''}`}
                                            onClick={() => formData.features.length > 1 && handleDeleteFeature(index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 col-12">
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" onClick={handleAddFeature}>
                                + Ajouter une fonctionnalité
                            </button>
                            <button className="btn btn-success" onClick={handleSubmit}>
                                Mettre à jour
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}