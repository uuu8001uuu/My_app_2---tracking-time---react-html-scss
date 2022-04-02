import React, {Component} from 'react';
import './sliderImage.scss';

export default class SliderImage extends Component {
    constructor(props) {
        super(props);
        this.state = {image: [
            {id: 'si1', src: require('../../image/work.png'), alt: 'work'},
            {id: 'si2', src: require('../../image/phone.png'), alt: 'phone'},
            {id: 'si3', src: require('../../image/dream.png'), alt: 'dream'},
            {id: 'si4', src: require('../../image/rest.png'), alt: 'rest'},
            {id: 'si5', src: require('../../image/road.png'), alt: 'road'},
            {id: 'si6', src: require('../../image/sport.png'), alt: 'sport'},
            {id: 'si7', src: require('../../image/book.png'), alt: 'book'},
            {id: 'si8', src: require('../../image/video.png'), alt: 'video'},
            {id: 'si9', src: require('../../image/communication.png'), alt: 'communication'},
            {id: 'si10', src: require('../../image/pet.png'), alt: 'pet'},
        ]};
        // this.onSelectImage = this.onSelectImage.bind(this);
    }


    render() {
        const data = this.state.image

        
        const elements = data.map((item) => {
                // click image - add class active
                let classImage = 'sliderImage-image__icon';

                if (this.props.stateImage === null) { 
                    classImage = 'sliderImage-image__icon'
                } else if (this.props.stateImage.id === item.id) { // We use additional if, because if stateImage=null then stateImage.id doesn't exist and thete will be an error.
                    classImage +=' activeImage';
                }

                return (
                <img
                    className = {classImage}
                    key={item.id}
                    src={item.src}
                    alt={item.alt}
                    onClick={() => this.props.onSelectImage(item)}
                    ></img>
                    )
                });
                
        return (
            <div
                className='sliderImage'
            >
                <div className='sliderImage-title'>Выберите иконку</div>
                <div className='sliderImage-image'>
                    {elements}
                </div>
            </div>
        )
    }
}

