interface GraduatesPerRowProps {
  year: string;
  program: string;
}

const GraduatesPerRow = ({ year, program }: GraduatesPerRowProps) => {
  return (
    <div>
      <div>
        <h1 className="text-primary font-bold">Graduates of {year}</h1>
        <h2 className="text-black">{program}</h2>
      </div>
    </div>
  );
};

export default GraduatesPerRow;
