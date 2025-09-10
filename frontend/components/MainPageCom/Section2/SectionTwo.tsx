import React from 'react'
import GestionDemandes from './GestionDemandes'
import { FaSearch, FaCog, FaClock, FaSync } from 'react-icons/fa';
import Services from './Services';
import NewRec from './NewRec';
import SecondButton from '@/components/SecondButton';

const SectionTwo = () => {
  return (
    <div 
        className="bg-contain bg-center bg-amber-50 w-full h-fit flex flex-col gap-20 p-10 sm:p-20  "
        style={{ backgroundImage: "url('/images/wordBlue.png')" }}
    >
        <div className='flex gap-2'>
            <h2 className='text-s sm:text-3xl font-inter font-bold text-neutral-900 mb-5'>Comment Nous Traitons </h2>
            <h2 className='text-s sm:text-3xl font-inter font-bold font-blue mb-5'> Vos Demandes:</h2>
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
            <GestionDemandes 
            Icon={FaSearch}
            title="Soumettre une Demande"
            description="Remplissez le formulaire avec les détails de votre problème et de votre localisation."
            
            />

            <GestionDemandes 
            Icon={FaClock}
            title="Attribution d’un Agent"
            description="Notre équipe examine votre demande
                et assigne des agents qualifiés
                pour la résoudre."
            
            />

            <GestionDemandes 
            Icon={FaSync}
            title="Mises à Jour & Résolution"
            description=" Recevez des mises à jour régulières
            jusqu’à la résolution complète 
            de votre demande."
            
            />
        </div>

        <div className='flex gap-2'>
            <h2 className='text-s sm:text-3xl font-inter font-bold text-neutral-900 mb-5'>Services Municipaux </h2>
            <h2 className='text-s sm:text-3xl font-inter font-bold font-blue mb-5'>que Nous Gérons:</h2>
        </div>
        <div className='flex flex-col sm:flex-row flex-wrap gap-10 items-center justify-center'>
            <Services
            title="Réparation des Routes"
            description=' Signalez des nids-de-poule,
            fissures ou routes endommagées'        
            />
            <Services
            title="Réparation des Routes"
            description=' Signalez des nids-de-poule,
            fissures ou routes endommagées'        
            />
            <Services
            title="Réparation des Routes"
            description=' Signalez des nids-de-poule,
            fissures ou routes endommagées'        
            />
            <Services
            title="Réparation des Routes"
            description=' Signalez des nids-de-poule,
            fissures ou routes endommagées'        
            />
            <Services
            title="Réparation des Routes"
            description=' Signalez des nids-de-poule,
            fissures ou routes endommagées'        
            />
            <Services
            title="Réparation des Routes"
            description=' Signalez des nids-de-poule,
            fissures ou routes endommagées'        
            />

        </div>


        <div className='flex gap-2'>
        <h2 className='text-s sm:text-3xl font-inter font-bold text-neutral-900 mb-5'>Mises à Jour Récentes des Demandes:</h2>
        </div>

        <div className='flex flex-col sm:flex-row flex-wrap gap-10 items-center justify-center'>
            <NewRec
                type ="Lampadaire"
                description =" Lampadaire cassé sur l’Avenue Oak"
                localisation='Avenue Oak, Près du Parc'
                etat = "Terminée"
                update="25/12/2025"
                href="/#"
            />

            <NewRec
                type ="Lampadaire"
                description =" Lampadaire cassé sur l’Avenue Oak"
                localisation='Avenue Oak, Près du Parc'
                etat = "Terminée"
                update="25/12/2025"
                href="/#"
            />
            
        </div>
        <div className='flex gap-2 justify-center items-center'>
            <SecondButton >
            Voir Plus
            </SecondButton>
        </div>

    </div>
  )
}

export default SectionTwo