import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function BrandExample() {
    const fileName = "examplefile.md";
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">{fileName}</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default BrandExample;
