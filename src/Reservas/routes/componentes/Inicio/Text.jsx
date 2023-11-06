import { Card, CardBody, CardText } from "react-bootstrap";

function Texto ({texto}){
  return(
    <Card>
      <CardBody>
        <CardText>
          {texto}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default Texto;