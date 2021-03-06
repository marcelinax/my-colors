import {saveAs} from "file-saver";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleLike} from "../state/favouriteColorsSlice";
import {AppDispatch, RootState} from "../store";
import ColorFormatType from "../types/ColorFormatType";
import parseColorFormat from "../utils/parseColorFormat";
import parseDate from "../utils/parseDate";

interface Props {
    'id': number;
    'hex': string;
    'numVotes': number;
    'dateCreated': string;
    'userName': string;
    'formatColor': ColorFormatType;
    hsv: {
        hue: number,
        saturation: number,
        value: number
    };
    rgb: {
        red: number,
        green: number,
        blue: number
    };
    imageUrl: string;
    onClick: () => void;

}


const MyColorsItem: React.FC<Props> = ({
                                           imageUrl,
                                           formatColor,
                                           rgb,
                                           hsv,
                                           hex,
                                           dateCreated,
                                           numVotes,
                                           userName,
                                           id,
                                           onClick
                                       }) => {

    const favouritesColorsIds = useSelector((state: RootState) => state.favouriteColors.favouritesColorsIds);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={'my-colors-item'}>
            <i className="bx bx-x close-btn" onClick={onClick}></i>
            <div className={'my-colors-item-box'}>
                <div className={'my-colors-item-box-bg'} style={{backgroundColor: '#' + hex}}>
                    <div className={'my-colors-item-box-bg-color'} onClick={() => {
                        navigator.clipboard.writeText(parseColorFormat(formatColor, hex, hsv, rgb));
                    }}>
                        <p>{parseColorFormat(formatColor, hex, hsv, rgb)}</p>
                    </div>
                </div>
                <div className={'my-colors-item-box-bottom'}>
                    <div className={'my-colors-item-box-bottom-row'}>
                        <div className={'my-colors-item-box-bottom-buttons'}>
                            <button onClick={() => dispatch(toggleLike(id))}><i
                                className={favouritesColorsIds.includes(id) ? "bx bxs-heart" : "bx bx-heart"}/>{favouritesColorsIds.includes(id) ? numVotes + 1 : numVotes}
                            </button>
                            <button onClick={() => {
                                saveAs(imageUrl);
                            }}><i className="bx bx-download"/> Image
                            </button>

                        </div>
                        <div className={'date-box'}>
                            <p>{parseDate(dateCreated)} by {userName}</p>
                        </div>

                    </div>
                    <div className={'my-colors-item-box-bottom-row'}>
                        <div className={'my-colors-item-box-bottom-color-box'} onClick={() => {
                            navigator.clipboard.writeText(`#${hex}`);
                        }}>
                            <p>#{hex}</p>
                        </div>
                        <div className={'my-colors-item-box-bottom-color-box'} onClick={() => {
                            navigator.clipboard.writeText(`hsv(${hsv.hue}, ${hsv.saturation}, ${hsv.value})`);
                        }}>
                            <p>{`hsv(${hsv.hue}, ${hsv.saturation}, ${hsv.value})`}</p>
                        </div>
                        <div className={'my-colors-item-box-bottom-color-box'} onClick={() => {
                            navigator.clipboard.writeText(`rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`);
                        }}>
                            <p>{`rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`}</p>
                        </div>

                    </div>

                </div>
            </div>


        </div>
    )
        ;
};

export default MyColorsItem;