import React from 'react'
import { Document, Page, Text, View, } from '@react-pdf/renderer';
import Header from './Header';
import tw from "../../../Utils/tailwind-react-pdf";
import InvoiceContent from './InvoiceContent';


const MonthlySalesDocument = ({ startDate, endDate, salesList }) => {
  return (
    <>
      <Document width={500} height={300} style={tw("font-normal")} >
        <InvoiceContent startDate={startDate} endDate={endDate} salesList={salesList} />
       
      </Document>
    </>
  )
}

export default MonthlySalesDocument