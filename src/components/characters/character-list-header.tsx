import { motion } from 'framer-motion';

export function CharacterListHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap gap-1 mx-auto mb-12 w-[300px] md:w-[600px] text-[2rem] md:text-[3rem] leading-tight">
        <span className="inline">Discover</span>&nbsp;
        <span>your</span>&nbsp;
        <span>favorite</span>&nbsp;
        <span className="inline bg-yellow-500 px-1 max-h-[4rem]">heroes</span>
        ,&nbsp;
        <span className="inline bg-red-500 px-1 max-h-[4rem]">villains</span>
        ,&nbsp;
        <span className="inline bg-green-500 px-1 max-h-[4rem]">species</span>
        &nbsp;
        <span className="inline">across</span>&nbsp;
        <span className="inline">the</span>&nbsp;
        <span className="inline">galaxy.</span>
      </div>
    </motion.div>
  );
}
