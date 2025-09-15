import React, { useEffect, useState } from "react";
import ReclamationCard from "./ReclamationCard";
import { getReclamationList } from "@/app/utils/Reclamation";

interface Reclamation {
  id : number;
  titre: string;
  description: string;
  category: string;
  status: string;
  localization: string;
  picture: string;
}


const RecList = () => {
  const [rec, setrec] = useState<Reclamation[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

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
        
      
      {rec.map((re) => (
        <ReclamationCard
          key={re.id}
          titre={re.titre}
          description={re.description}
          category={re.category}
          status={re.status}
          localization={re.localization}
          picture={re.picture}
          
          
        />
      ))}
    </div>
  );
};

export default RecList;
