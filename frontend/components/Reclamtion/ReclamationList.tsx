import React, { useEffect, useState } from "react";
import ReclamationCard from "./ReclamationCard";
import { getReclamationList, deleteReclamation } from "@/app/utils/Reclamation";

interface Reclamation {
  id : number;
  titre: string;
  description: string;
  category: string;
  status: string;
  localization: string;
  date_soumission : string;
  picture: string;
}


const RecList = () => {
  const [rec, setrec] = useState<Reclamation[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: number) => {
    try {
      await deleteReclamation(id);
      setrec(rec.filter(r => r.id !== id));
      alert('Réclamation supprimée avec succès!');
    } catch (error) {
      console.error('Error deleting reclamation:', error);
      alert('Erreur lors de la suppression de la réclamation');
    }
  };

  useEffect(() => {
    const fetchrec = async () => {
      try {
        const data = await getReclamationList();
        setrec(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchrec();
  }, []);
    
  if (loading) return <p>Loading reclamation...</p>;
  if (rec.length === 0) return <p>No reclamation available</p>;

  return (
    <div className="flex flex-wrap justify-start gap-4">
        
      <h1 className="text-3xl font-meduim ">Vos reclamations</h1>
      {rec.map((re) => (
        <ReclamationCard
          key={re.id}
          id={re.id}
          titre={re.titre}
          description={re.description}
          category={re.category}
          status={re.status}
          localization={re.localization}
          date={re.date_soumission}
          picture={re.picture}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default RecList;
