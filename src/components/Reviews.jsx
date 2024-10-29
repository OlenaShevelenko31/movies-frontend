import { useEffect, useRef } from 'react';
import api from '../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from './ReviewForm';
import React from 'react';

const Reviews = ({ getMovieData, movie, reviews = [], setReviews }) => { 
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [movieId]);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        try {
            const response = await api.post("/api/v1/reviews", {
                reviewBody: rev.value,
                imdbId: movieId,
            });

            const updatedReviews = Array.isArray(reviews) ? [...reviews, { body: rev.value }] : [{ body: rev.value }];
            rev.value = "";
            setReviews(updatedReviews);
        } catch (err) {
            console.error(err);
        }
    };

    console.log('Reviews:', reviews);

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {
                        reviews.length > 0 ? (
                            reviews.map((r, index) => (
                                <React.Fragment key={index}>  {/* Add unique key here */}
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            ))
                        ) : (
                            <Row>
                                <Col>No reviews available.</Col>
                            </Row>
                        )
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;
