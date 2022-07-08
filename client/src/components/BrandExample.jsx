import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function BrandExample() {
    const fileName = "examplefile.md";
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand>{fileName}</Navbar.Brand>
                <Navbar.Brand>{fileName}</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default BrandExample;
