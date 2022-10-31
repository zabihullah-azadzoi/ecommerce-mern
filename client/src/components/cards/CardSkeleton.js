import { Card, Skeleton } from "antd";

const CardSkeleton = ({ count }) => {
  const card = () => {
    let cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <div className="col-md-4 text-center" key={i}>
          <Card>
            <Skeleton active />
          </Card>
        </div>
      );
    }
    return cards;
  };

  return <div className="row">{card()}</div>;
};

export default CardSkeleton;
