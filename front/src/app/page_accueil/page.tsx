'use client'

import React, { useEffect, useState } from 'react';
import { FiPlus, FiList } from 'react-icons/fi';
import Button from '../../components/button/page';
import Image from 'next/image';
import axios from 'axios';

export default function Page() {
  const [onStop, setOnStop] = useState(false);

  useEffect(() => {
    const stopDNS = async () => {
      try {
        if(onStop) {
          const response = await axios.get('http://localhost:5000/stop-dns');
        }
      } catch(err) {
        console.error(err);
      }
    }

    stopDNS();
  }, [onStop])

    return (
      <main>
        <div className="flex flex-col items-center justify-center min-h-screen bg-my-blue">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-3xl mx-auto flex items-center">
              <div className="w-1/2">
                <h1 className="text-3xl text-h1col font-bold mb-4">RESEAU LOCAL ENSPY</h1>
                <p className="text-gray-700 text-justify mb-4">Bienvenue sur notre plateforme où vous pouvez avoir un nom de domaine et consulter la liste de ceux disponibles.</p>
                <div className='flex space-x-8'>
                  <Button to="../page_listeDNS" className="mr-2 bg-my-butt" icon={<FiList />}>
                    domaines
                  </Button>
                  <Button to="../page_formulaire" className="mr-2 bg-my-butt" icon={<FiPlus />}>
                    domaines
                  </Button>
                  <button 
                  onClick={(e) => setOnStop(true)}
                  className="bg-my-butt hover:bg-my-ablue text-white font-bold py-2 px-4 rounded"> Stop </button>
                </div>
              </div>
              <div className="w-1/2">
                <Image src="/images/img.png" alt=" L'image de la page d'accueil " width={800} height={800} className="max-w-full"/>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }