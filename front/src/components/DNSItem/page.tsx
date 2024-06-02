import { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

interface DnsItemProps {
    name: string;
    status:  string;
  }
  
  const DnsItem: React.FC<DnsItemProps> = ({ name, status, desc }) => {
    const [showDescription, setShowDescription] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
      setDescription(desc);
    }, []);
  
    return (
      <div className="mb-4 border-b border-gray-300">
        <div className="flex items-center justify-between space-x-12">
          <div>
            <div className="font-bold">{name}</div>
            <div className={`mr-2 ${status === 'Actif' ? 'text-green-500' : 'text-red-500'}`}>{status}</div>
          </div>
          <button
          className=" bg-my-butt hover:bg-my-ablue text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? (
            <>
              <span className="mr-2">Réduire</span>
              <FaChevronUp/>
            </>
          ) : (
            <>
              <span className="mr-2">Détails</span>
              <FaChevronDown/>
            </>
          )}
        </button>
        </div>
        {showDescription && (
          <p className="text-gray-600">
            { description }
          </p>
        )}
      </div>
    );
  };

export default DnsItem;