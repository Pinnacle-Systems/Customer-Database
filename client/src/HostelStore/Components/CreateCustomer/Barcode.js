import React, { useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { Image } from '@react-pdf/renderer';
import tw from '../../../Utils/tailwind-react-pdf';
import { useState } from 'react';

const BarcodeGenerator = ({ value }) => {
    const [barcode, setBarcode] = useState("")

    useEffect(() => {
        const canvas = document.createElement('canvas');
        JsBarcode(canvas, value);
        setBarcode(canvas.toDataURL());
    }, [value]);

    return <Image src={barcode} style={tw("w-[90px] h-[50px]")} />
};

export default BarcodeGenerator;