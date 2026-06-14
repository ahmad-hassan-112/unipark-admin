const RequiredLabel = ({ name }: { name: string }) => (
  <label>
    {name} <span className="text-[#E03137]">*</span>
  </label>
);

export default RequiredLabel;
