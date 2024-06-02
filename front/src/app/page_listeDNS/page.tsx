'use client'
import React, { useEffect, useState } from 'react';
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import DnsItem from '../../components/DNSItem/page';
import Link from 'next/link';
import axios from 'axios';

export default function Page() {
  const [dnsItems, setDnsItems] = useState([]);  

  const dnsItems2 = [
    { name: 'Nom_DNS_1', status: 'Actif' },
    { name: 'Nom_DNS_2', status: 'Actif' },
    { name: 'Nom_DNS_3', status: 'Inactif' },
    { name: 'Nom_DNS_2', status: 'Actif' },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/list-dns');
        console.log(response.data);
        setDnsItems(response.data);
      } catch(err) {
        console.error(`On a une erreur : ${err}`);
      }
    }

    getData();
  }, [])

    return (
      <main>
        <Header/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-my-blue">
        <h1 className="text-3xl text-h1col font-bold mb-4">RESEAU LOCAL ENSPY</h1>
          <div className="max-w-sm bg-white rounded-lg shadow-md p-6">
            <h2 className="mb-4 text-center text-2xl font-bold">Liste DNS actifs</h2>
            <div className="border-b relative border-gray-300 mb-4"></div>
            <div className="max-h-[16rem] overflow-y-auto">
            {dnsItems.map((item, index) => (
              <DnsItem key={`dns-item-${index}`} name={item.domain} status={item.actif == 1 ? 'Actif' : 'Inactif'} desc = {item.description} />
            ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="../page_accueil" className="bg-my-ablue hover:bg-my-butt text-white font-bold py-2 px-4 rounded">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
        <Footer/>
      </main>
    );
  }