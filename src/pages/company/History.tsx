// Props의 모양 만들기
interface HistoryProps {
  title: string;
  year: number;
}

const History: React.FC<HistoryProps> = ({ title, year }) => {
  return (
    <div>
      <h1>
        {title} {year} 연혁
      </h1>
    </div>
  );
};

export default History;
