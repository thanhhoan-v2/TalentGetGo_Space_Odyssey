import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Planet Card Component
interface PlanetCardProps {
  planetName: string;
  imageUrl?: string;
}

export function PlanetCard({ planetName, imageUrl }: PlanetCardProps) {
  const unknownPlanet = (planetName: string) => {
    return {
      image: 'https://lumiere-a.akamaihd.net/v1/images/image_51705c58.jpeg',
      searchUrl: `https://www.starwars.com/databank/${planetName}`,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={
          planetData[planetName]?.searchUrl ||
          unknownPlanet(planetName).searchUrl
        }
        target="_blank"
        className="group block mx-auto w-full max-w-[280px]"
      >
        <div className="relative overflow-hidden">
          <div className="relative h-[320px] overflow-hidden">
            <Image
              src={
                planetData[planetName]?.image || unknownPlanet(planetName).image
              }
              alt={planetName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

          <div className="top-3 right-3 absolute"></div>

          <div className="right-0 bottom-0 left-0 absolute p-5">
            <div className="flex justify-between items-center gap-3">
              <div className="space-y-1.5">
                <h3 className="font-semibold text-white dark:text-zinc-100 text-lg leading-snug">
                  {planetName}
                </h3>
              </div>
              <div className="bg-black/50 p-2">
                <SearchIcon className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-600" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const planetData: Record<string, { image: string; searchUrl: string }> = {
  Tatooine: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/tatooine-main_9542b896.jpeg?region=165,0,949,534',
    searchUrl: 'https://www.starwars.com/databank/tatooine',
  },
  Alderaan: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/alderaan-main_f5b676cf.jpeg?region=0%2C0%2C1280%2C720',
    searchUrl: 'https://www.starwars.com/databank/alderaan',
  },
  'Yavin IV': {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/yavin-4-main_bd23f447.jpeg?region=331%2C0%2C949%2C534',
    searchUrl: 'https://www.starwars.com/databank/yavin-iv',
  },
  Hoth: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/Hoth_d074d307.jpeg?region=0%2C0%2C1200%2C675',
    searchUrl: 'https://www.starwars.com/databank/hoth',
  },
  Dagobah: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/Dagobah_890df592.jpeg?region=0%2C80%2C1260%2C711',
    searchUrl: 'https://www.starwars.com/databank/dagobah',
  },
  Bespin: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/Bespin_2d0759aa.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/bespin',
  },
  'Ord Mantell': {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/ordo-mantell-main_0320929c.jpeg?region=158%2C0%2C964%2C542',
    searchUrl: 'https://www.starwars.com/databank/ord-mantell',
  },
  Endor: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/databank_endor_01_169_68ba9bdc.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/endor',
  },
  Naboo: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/databank_naboo_01_169_6cd7e1e0.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/naboo',
  },
  Coruscant: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/coruscant-main_d2fad5f2.jpeg?region=245%2C0%2C1430%2C804',
    searchUrl: 'https://www.starwars.com/databank/coruscant',
  },
  Utapau: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/databank_utapau_01_169_14a54eb1.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/utapau',
  },
  Mustafar: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/databank_mustafar_01_169_5b470758.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/mustafar',
  },
  Kashyyyk: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/kashyyyk-main_37a2e497.jpeg?region=237%2C0%2C1445%2C813',
    searchUrl: 'https://www.starwars.com/databank/kashyyyk',
  },
  'Polis Massa': {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/databank_polismassa_01_169_21f04b76.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/polis-massa',
  },
  Mygeeto: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/mygeeto-main-image_91c503cc.jpeg?region=49%2C0%2C1181%2C665',
    searchUrl: 'https://www.starwars.com/databank/mygeeto',
  },
  Felucia: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/databank_felucia_01_169_2070e38e.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/felucia',
  },
  'Cato Neimoidia': {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/databank_catoneimoidia_01_169_d2b9bb58.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/cato-neimoidia',
  },
  Saleucami: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/saleucami-main_41b56ea0.jpeg?region=161%2C0%2C958%2C539',
    searchUrl: 'https://www.starwars.com/databank/saleucami',
  },
  Kamino: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/kamino-main_3001369e.jpeg?region=158%2C0%2C964%2C542',
    searchUrl: 'https://www.starwars.com/databank/kamino',
  },
  Geonosis: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/databank_geonosis_01_169_1d04e086.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/geonosis',
  },
  Rodia: {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/databank_rodia_01_169_6f76b79d.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/rodia',
  },
  'Nal Hutta': {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/databank_nalhutta_01_169_2070e38e.jpeg?region=0%2C0%2C1560%2C878',
    searchUrl: 'https://www.starwars.com/databank/nal-hutta',
  },
};
