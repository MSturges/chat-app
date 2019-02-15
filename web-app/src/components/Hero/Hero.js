import React from 'react';
import { Parallax } from 'react-parallax';
import Typography from '@material-ui/core/Typography';

const Hero = () => (
    <Parallax blur={{ min: -15, max: 15 }}
              className='hero'
              bgImage='/images/hero/hero_lg.jpeg'
              bgImageAlt='hero image'
              strength={ -200 }
              bgImageStyle={{ opacity: 0.7, marginTop: -140 }}>
        <Typography variant='h3' 
                    color='secondary'
                    className='center'>
            Hero Image
        </Typography>
    </Parallax>
);

export default Hero;