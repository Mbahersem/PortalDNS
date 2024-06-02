'use client'
import React, { useEffect, useState } from 'react';
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import Link from 'next/link';
import axios from 'axios';

export default function Page() {

  const [ipAddress, setIpAddress] = useState('');
  const [dnsName, setDnsName] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setOnSubmitted] = useState(false);

  useEffect(() => {
    const postData = async () => {
      try {
        const dataToSend = {
          ip: ipAddress,
          domain: dnsName,
          description: description
        };

        setIpAddress('');
        setDnsName('');
        setDescription('');

        const response = await axios.post('http://localhost:5000/add-dns', dataToSend);
        console.log(`Réponse de la requête : ${response.data}`);
      } catch(err) {
        console.error(`Erreur lors de la requête : ${err}`);
      }
    }

    postData();
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer les données du formulaire
    console.log('DNS Name:', dnsName);
    console.log('Description:', description);
    console.log('Adresse IP:', ipAddress);
  };

  return (
    <main>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-my-blue">
        <h1 className="text-3xl text-h1col font-bold mb-4">RESEAU LOCAL ENSPY</h1>
        <div className="max-w-sm bg-white rounded-lg shadow-md p-6">
          <h2 className="mb-4 text-2xl font-bold">Formulaire d'ajout DNS</h2>
          <div className="border-b relative border-gray-300 mb-4"></div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="ip" className="block font-bold mb-2">Adresse IP</label>
              <input
                type="text"
                id="ip"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="border bg-my-blue outline-none rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dnsName" className="block font-bold mb-2">Nom DNS</label>
              <input
                type="text"
                id="dnsName"
                value={dnsName}
                onChange={(e) => setDnsName(e.target.value)}
                className="border bg-my-blue outline-none rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-bold mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border bg-my-blue outline-none rounded px-3 py-2 w-full"
                required
              ></textarea>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={(e) => setOnSubmitted(true)}
                type="submit"
                className="bg-my-butt hover:bg-my-ablue text-white font-bold py-2 px-4 rounded"
              >
                Enregistrer
              </button>
              <Link href="../page_accueil" className="bg-my-ablue hover:bg-my-butt text-white font-bold py-2 px-2 rounded">
                Retour à l'accueil
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}