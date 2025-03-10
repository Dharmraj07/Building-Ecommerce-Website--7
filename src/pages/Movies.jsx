import React, { useState } from "react";
import { Card, Container, Row, Col, Button, Spinner, Modal } from "react-bootstrap";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) throw new Error("Failed to fetch movies.");

      const data = await response.json();
      const transformedMovies = data.results.map((movie) => ({
        id: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.opening_crawl,
      }));

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <h2>Star Wars Movies</h2>
        <Button variant="primary" onClick={fetchMovies} disabled={isLoading}>
          Fetch Movies
        </Button>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}
      {!isLoading && movies.length === 0 && !error && (
        <p className="text-center">No movies found. Click "Fetch Movies" to load data.</p>
      )}

      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text>{movie.openingText.slice(0, 150)}...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Full-Screen Loader Modal */}
      <Modal show={isLoading} centered backdrop="static">
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" variant="primary" />
          <span className="ml-3">Loading movies...</span>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Movies;
