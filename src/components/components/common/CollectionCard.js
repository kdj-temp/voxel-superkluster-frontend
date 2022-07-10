import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CollectionDiv = styled.div`
    margin: 20px 10px;
    width: 430px;
    max-width: 100%;
    height: auto;
    border-radius: 16px;
    transition: transform .4s;
    cursor: pointer;
    border: 1px solid ${props => props.theme.cardBorderColor};

    &:hover {
        transform: scale(1.05);
    }
`

const ImageDiv = styled.div`
    margin: 10px;
    border-radius: 6px;
    overflow: hidden;
`

const CreatorLogo = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: -35px auto 0px auto;
    cursor: pointer;
`

const CollectionInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 25px 0px;
`

const Title = styled.div`
    font-family: "inter";
    font-size: 24px;
    font-weight: 400;
    font-style: normal;
    text-align: center;
    color: ${props => props.theme.primaryColor};
`

const Description = styled.div`
    font-family: "inter";
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    text-align: center;
    color: ${props => props.theme.primaryColor};
`

const CollectionCard = ({ collection }) => {
    return (
        <div>
            <a href={`/collection-detail/newstar-nft`} >
                <CollectionDiv>
                    <ImageDiv>
                        <LazyLoadImage 
                            effect="opacity"
                            src="/img/collections/coll-1.jpg"
                            className="collection-card-img"
                            width='100%'
                        />
                    </ImageDiv>
                    <CreatorLogo>
                        <a href={`/author/0x5A422060ab526C3f112e48c0C21C74414237eaf3`}>
                            <LazyLoadImage src="/img/misc/avatar-1.png" alt="" width='109%' height='100%'/>
                        </a>
                    </CreatorLogo>
                    <CollectionInfo>
                        <Title>QatarStar NFT</Title>
                        <Description>Created by 0xabcd....</Description>
                    </CollectionInfo>
                
                </CollectionDiv>
            </a>
        </div>
    )
}

export default CollectionCard;