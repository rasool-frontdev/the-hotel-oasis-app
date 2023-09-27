import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://frgfupevomnsnuhfwblt.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2023-09-27T08%3A26%3A00.726Z"
        alt=""
      />
    </Row>
  );
}

export default Cabins;
