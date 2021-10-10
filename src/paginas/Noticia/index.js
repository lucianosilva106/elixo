import firebase from '../../firebaseConnection';
import { useState } from 'react';
import React from 'react';
import { useQuery } from "graphql-hooks";
import { Box } from '@material-ui/system';
import { Container } from 'react-bootstrap';
import { Image } from 'react-datocms';

const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allArtigos(first: $limit) {
    titulo
    tumbnail {
      responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
  }
}`;

function Noticia() {

  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10
    }
  });
  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";

    return (
      <Container fixed>
        {data.allArtigos.map(artigo => (
        <Box>
        
        <h6>{artigo.titulo}</h6>
      </Box>
      ))}
      </Container>
    );
}
  
export default Noticia;