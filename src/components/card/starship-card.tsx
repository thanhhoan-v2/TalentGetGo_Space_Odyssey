import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface StarshipCardProps {
  starshipName: string;
}

export function StarshipCard({ starshipName }: StarshipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={starshipData[starshipName].searchUrl}
        target="_blank"
        className="group block mx-auto w-full max-w-[280px]"
      >
        <div className="relative rounded-2xl overflow-hidden">
          <div className="relative h-[320px] overflow-hidden">
            <Image
              src={starshipData[starshipName].image}
              alt={starshipName}
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
                  {starshipName}
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

const starshipData: Record<string, { image: string; searchUrl: string }> = {
  'CR90 corvette': {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnJ3-CekgYskA1fV7BDVTsJTKBVVJfvklaTg&s',
    searchUrl: 'https://starwars.fandom.com/wiki/CR90_corvette',
  },
  'Star Destroyer': {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYazfl0_spsMl8AWhg4sXjofPAk9Wbhh9p7A&s',
    searchUrl: 'https://starwars.fandom.com/wiki/Star_Destroyer',
  },
  'Sentinel-class landing craft': {
    image: 'https://i.redd.it/zhg4yt34fah81.jpg',
    searchUrl: 'https://starwars.fandom.com/wiki/Sentinel-class_landing_craft',
  },
  'Death Star': {
    image:
      'https://lumiere-a.akamaihd.net/v1/images/Death-Star-I-copy_36ad2500.jpeg?region=0%2C0%2C1600%2C900',
    searchUrl: 'https://starwars.fandom.com/wiki/Death_Star',
  },
  'Millennium Falcon': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/5/52/Millennium_Falcon_Fathead_TROS.png/revision/latest?cb=20221029015218',
    searchUrl: 'https://starwars.fandom.com/wiki/Millennium_Falcon',
  },
  'Y-wing': {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQo_UMzgBVn4SbpMoUqDtINu8B6CavgaT1Nw&s',
    searchUrl: 'https://starwars.fandom.com/wiki/Y-wing',
  },
  'X-wing': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/5/57/Black_One_BF2.png/revision/latest?cb=20170825000542',
    searchUrl: 'https://starwars.fandom.com/wiki/X-wing',
  },
  'TIE Advanced x1': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/d/de/The_Inquisitors_TIE_Fighter_2.png/revision/latest?cb=20161109034547',
    searchUrl: 'https://starwars.fandom.com/wiki/TIE_Advanced_x1',
  },
  Executor: {
    image:
      'https://static.wikia.nocookie.net/starwars/images/3/30/Executor_BF2.png/revision/latest?cb=20230405071103',
    searchUrl: 'https://starwars.fandom.com/wiki/Executor',
  },
  'Rebel transport': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/4/44/GR-75MediumTransport-100Scenes.png/revision/latest?cb=20221105213502',
    searchUrl: 'https://starwars.fandom.com/wiki/Rebel_transport',
  },
  'Slave 1': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/4/4f/SlaveI-SWBC20.png/revision/latest?cb=20231224005943',
    searchUrl: 'https://starwars.fandom.com/wiki/Slave_1',
  },
  'Imperial shuttle': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/6/6d/LambdaShuttle-Fathead.png/revision/latest?cb=20230802043430',
    searchUrl: 'https://starwars.fandom.com/wiki/Imperial_shuttle',
  },
  'EF76 Nebulon-B escort frigate': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/4/4b/MedicalFrigate-BaseSeries4.png/revision/latest?cb=20240908201310',
    searchUrl: 'https://starwars.fandom.com/wiki/EF76_Nebulon-B_escort_frigate',
  },
  'Calamari Cruiser': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/7/73/MonCalamariCruiser-TSWB.png/revision/latest?cb=20201021040315',
    searchUrl: 'https://starwars.fandom.com/wiki/Calamari_Cruiser',
  },
  'A-wing': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/8/8d/A-wing_DICE.png/revision/latest?cb=20161021230115',
    searchUrl: 'https://starwars.fandom.com/wiki/A-wing',
  },
  'B-wing': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/8/85/BwingStarfighter-CGSWG.png/revision/latest?cb=20250210071035',
    searchUrl: 'https://starwars.fandom.com/wiki/B-wing',
  },
  'Republic Cruiser': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/5/5f/Republic_Cruiser.png/revision/latest?cb=20230311200333',
    searchUrl: 'https://starwars.fandom.com/wiki/Republic_Cruiser',
  },
  'Droid control ship': {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZP9lL0Ni3NzuHMkan-_6jXvYUSrnfJu8MCA&s',
    searchUrl: 'https://starwars.fandom.com/wiki/Droid_control_ship',
  },
  'Naboo fighter': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/d/d3/N-1_BF2.png/revision/latest?cb=20170825000654',
    searchUrl: 'https://starwars.fandom.com/wiki/Naboo_fighter',
  },
  'Naboo Royal Starship': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/9/9a/Naboo_Royal_Starship_SWE.png/revision/latest?cb=20250206052646',
    searchUrl: 'https://starwars.fandom.com/wiki/Naboo_Royal_Starship',
  },
  Scimitar: {
    image:
      'https://static.wikia.nocookie.net/starwars/images/1/1c/Scimitar-USC.png/revision/latest?cb=20190604143506',
    searchUrl: 'https://starwars.fandom.com/wiki/Scimitar',
  },
  'J-type diplomatic barge': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/f/fd/NabooCruiser-NEGVV.png/revision/latest?cb=20221020152328',
    searchUrl: 'https://starwars.fandom.com/wiki/J-type_diplomatic_barge',
  },
  'AA-9 Coruscant freighter': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/1/17/AA-9_Coruscant_freighter.jpg/revision/latest?cb=20170608061557',
    searchUrl: 'https://starwars.fandom.com/wiki/AA-9_Coruscant_freighter',
  },
  'Jedi starfighter': {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYm4ENJwyqLo43o8-UgeCiYNiFKC6_yILgjw&s',
    searchUrl: 'https://starwars.fandom.com/wiki/Jedi_starfighter',
  },
  'H-type Nubian yacht': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/1/1f/Nabooyacht-NEGVV.png/revision/latest?cb=20170411041853',
    searchUrl: 'https://starwars.fandom.com/wiki/H-type_Nubian_yacht',
  },
  'Republic Assault ship': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/7/70/Acclamator-TCWIV.png/revision/latest?cb=20241129023841',
    searchUrl: 'https://starwars.fandom.com/wiki/Republic_Assault_ship',
  },
  'Solar Sailer': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/b/b2/DookusSolarSailer-TCW.png/revision/latest?cb=20221105025756',
    searchUrl: 'https://starwars.fandom.com/wiki/Solar_Sailer',
  },
  'Trade Federation cruiser': {
    image:
      'https://static.wikia.nocookie.net/battlefront/images/1/17/Providence-Class.png/revision/latest?cb=20110910180110',
    searchUrl: 'https://starwars.fandom.com/wiki/Trade_Federation_cruiser',
  },
  'Theta-class T-2c shuttle': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/d/d7/Theta_T-2c.jpg/revision/latest?cb=20061207174737',
    searchUrl: 'https://starwars.fandom.com/wiki/Theta-class_T-2c_shuttle',
  },
  'Republic attack cruiser': {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasIc0IyDDJ9K1_ekbyxCn8991kCwSj1FDRw&s',
    searchUrl: 'https://starwars.fandom.com/wiki/Republic_attack_cruiser',
  },
  'Naboo star skiff': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/d/df/Naboo_star_skiff_1.png/revision/latest?cb=20130212042348',
    searchUrl: 'https://starwars.fandom.com/wiki/Naboo_star_skiff',
  },
  'Jedi Interceptor': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/0/04/Eta-2JediInterceptor-USC.png/revision/latest?cb=20231105182911',
    searchUrl: 'https://starwars.fandom.com/wiki/Jedi_Interceptor',
  },
  'ARC-170': {
    image:
      'https://static.wikia.nocookie.net/swse/images/2/29/ARC-170_Starfighter.png/revision/latest?cb=20171105185415',
    searchUrl: 'https://starwars.fandom.com/wiki/ARC-170',
  },
  'Banking clan frigte': {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvTxraMNwJIr6HT1dy2mWh3pXcd_4DvZqeQ&s',
    searchUrl: 'https://starwars.fandom.com/wiki/Banking_clan_frigate',
  },
  'Belbullab-22 starfighter': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/2/21/SoullessOne-TCW.png/revision/latest/smart/width/386/height/259?cb=20221117145011',
    searchUrl: 'https://starwars.fandom.com/wiki/Belbullab-22_starfighter',
  },
  'V-wing': {
    image:
      'https://static.wikia.nocookie.net/starwars/images/0/04/VWing-NEGVV.png/revision/latest?cb=20170412013305',
    searchUrl: 'https://starwars.fandom.com/wiki/V-wing',
  },
  'arc-170': {
    image:
      'https://static.wikia.nocookie.net/swse/images/2/29/ARC-170_Starfighter.png/revision/latest?cb=20171105185415',
    searchUrl: 'https://starwars.fandom.com/wiki/ARC-170',
  },
};
