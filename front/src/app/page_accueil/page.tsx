import React from 'react';
import { FiPlus, FiList } from 'react-icons/fi';
import Button from '../../components/button/page';
import Image from 'next/image';


export default function Page() {
    return (
      <main>
        <div className="flex flex-col items-center justify-center min-h-screen bg-my-blue">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-3xl mx-auto flex items-center">
              <div className="w-1/2">
                <h1 className="text-3xl text-h1col font-bold mb-4">RESEAU LOCAL ENSPY</h1>
                <p className="text-gray-700 text-justify mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor elit sit amet ligula malesuada, ac egestas orci finibus. Nulla facilisi.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className='flex space-x-8'>
                  <Button to="../page_listeDNS" className="mr-2 bg-my-butt" icon={<FiList />}>
                    domaines
                  </Button>
                  <Button to="../page_formulaire" className="mr-2 bg-my-butt" icon={<FiPlus />}>
                    domaines
                  </Button>
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