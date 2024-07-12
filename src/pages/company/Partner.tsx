import { IArr } from "../../types/datatype";

interface PartnerProps {
  pc: IArr[];
}

const Partner: React.FC<PartnerProps> = ({ pc }) => {
  return (
    <div>
      <h1>파트너 소개</h1>
      <ul>
        {pc.map((item, index, arr) => (
          <li key={index}>
            {item.name} {item.link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Partner;
