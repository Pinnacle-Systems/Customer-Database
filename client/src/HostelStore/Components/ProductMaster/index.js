import React, { useEffect, useState, useRef, useCallback } from 'react';
import secureLocalStorage from 'react-secure-storage';

import FormHeader from '../../../Basic/components/FormHeader';
import FormReport from "../../../Basic/components/FormReportTemplate";
import { toast } from "react-toastify"
import { TextInput, CheckBox, DropdownInput } from "../../../Inputs"
import ReportTemplate from '../../../Basic/components/ReportTemplate';
import {
  useGetProductQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../../../redux/services/ProductMasterService'
import Portion from './portion';
import { useGetProductBrandQuery } from '../../../redux/services/ProductBrandService'
import { useGetProductCategoryQuery } from '../../../redux/services/ProductCategoryServices'
import { useGetUomQuery } from '../../../redux/services/UomMasterService';
import { dropDownListObject } from '../../../Utils/contructObject';
import { findFromList } from '../../../Utils/helper';

const MODEL = "Product  Master";

export default function Form() {
  const [form, setForm] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [id, setId] = useState("")
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [active, setActive] = useState(true);
  const [productBrandId, setProductBrandId] = useState("");
  const [uomId, setUomId] = useState("")
  const [productCategoryId, setProductCategoryId] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [ProductUomPriceDetails, setProductUomPriceDetails] = useState([]);

  const childRecord = useRef(0);

  const params = { companyId: secureLocalStorage.getItem(sessionStorage.getItem("sessionId") + "userCompanyId") }

  const { data: allData, isLoading, isFetching } = useGetProductQuery({ params, searchParams: searchValue });
  const { data: singleData, isFetching: isSingleFetching, isLoading: isSingleLoading } = useGetProductByIdQuery(id, { skip: !id });
  console.log(singleData, 's data');
  const [addData] = useAddProductMutation();
  const [updateData] = useUpdateProductMutation();
  const [removeData] = useDeleteProductMutation();



  const { data: productBrandList } =
    useGetProductBrandQuery({ params });

  const { data: productCategoryList } =
    useGetProductCategoryQuery({ params });

  const { data: uomList } = useGetUomQuery({ params })
  const syncFormWithDb = useCallback(
    (data) => {

      if (id) setReadOnly(true);
      setName(data?.name ? data.name : "");
      setCode(data?.code ? data.code : "");
      setActive(id ? (data?.active ? data.active : false) : true);
      setProductBrandId(data?.productBrandId ? data.productBrandId : "");
      setProductCategoryId(data?.productCategoryId ? data.productCategoryId : "");
      setUomId(data?.uomId ? data?.uomId : "");
      setProductUomPriceDetails(data?.ProductUomPriceDetails ? data.ProductUomPriceDetails : [])
      childRecord.current = data?.childRecord ? data?.childRecord : 0;
    }, [id])


  useEffect(() => {
    syncFormWithDb(singleData?.data);
  }, [isSingleFetching, isSingleLoading, id, syncFormWithDb, singleData])


  const data = {
    name, code, productBrandId, productCategoryId, companyId: secureLocalStorage.getItem(sessionStorage.getItem("sessionId") + "userCompanyId"), active, id, ProductUomPriceDetails
  }



  const validateData = (data) => {
    if (data.name) {
      return true;
    }
    return false;
  }

  const handleSubmitCustom = async (callback, data, text) => {
    try {
      let returnData = await callback(data).unwrap();
      if (returnData.statusCode === 0) {
        setId("")
        syncFormWithDb(undefined)
        toast.success(text + "Successfully");
      } else {
        toast.error(returnData?.message)
      }
    } catch (error) {
      console.log("handle")
    }
  }

  const saveData = () => {
    if (!validateData(data)) {
      toast.info("Please fill all required fields...!", { position: "top-center" })
      return
    }
    if (!window.confirm("Are you sure save the details ...?")) {
      return
    }
    if (id) {
      handleSubmitCustom(updateData, data, "Updated")
    } else {
      handleSubmitCustom(addData, data, "Added")
    }
  }

  const deleteData = async () => {
    if (id) {
      if (!window.confirm("Are you sure to delete...?")) {
        return
      }
      try {
        let returnData = await removeData(id).unwrap();
        if (returnData.statusCode === 0) {
          setId("")
          syncFormWithDb(undefined)
          toast.success("Deleted Successfully");
        } else {
          toast.error(returnData?.message)
        }
      } catch (error) {
        toast.error("something went wrong")
      }
      ;
    }
  }

  const handleKeyDown = (event) => {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === 's') {
      event.preventDefault();
      saveData();
    }
  }

  // useEffect(() => {
  //   setName(`${findFromList(productBrandId, productBrandList?.data, "name")} ${findFromList(productCategoryId, productCategoryList?.data, "name")} ${findFromList(uomId, uomList?.data, "name")}`)
  // }, [productBrandId, productCategoryId, uomId, setName])

  const onNew = () => { setId(""); setReadOnly(false); setForm(true); setSearchValue("") }

  function onDataClick(id) {
    setId(id);
    setForm(true);
  }
  const tableHeaders = [
    "Name", "Status"
  ]
  const tableDataNames = ["dataObj.name", 'dataObj.active ? ACTIVE : INACTIVE']

  if (!form)
    return <ReportTemplate
      heading={MODEL}
      tableHeaders={tableHeaders}
      tableDataNames={tableDataNames}
      loading={
        isLoading || isFetching
      }
      setForm={setForm}
      data={allData?.data}
      onClick={onDataClick}
      onNew={onNew}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />

  return (
    <div onKeyDown={handleKeyDown} className='md:items-start md:justify-items-center grid h-full bg-theme'>
      <div className='flex flex-col frame w-full h-full'>
        <FormHeader
          onNew={onNew}
          onClose={() => {
            setForm(false);
            setSearchValue("");
          }} model={MODEL}
          saveData={saveData} setReadOnly={setReadOnly}
          deleteData={deleteData}
        //  childRecord={childRecord.current}
        />
        <div className='flex-1 grid grid-cols-1 md:grid-cols-4 gap-x-2 overflow-clip'>
          <div className='col-span-3 grid md:grid-cols-1 border overflow-auto'>
            <div className='mr-1 md:ml-2'>
              <fieldset className='frame my-1'>
                <legend className='sub-heading'>Product Info</legend>
                <div className='grid grid-cols-3 my-2'>
                  <DropdownInput name="Product Category" options={dropDownListObject(id ? productCategoryList.data : productCategoryList.data.filter(item => item.active), "name", "id")} value={productCategoryId} setValue={setProductCategoryId} required={true} readOnly={readOnly} disabled={(childRecord.current > 0)} />
                  <DropdownInput name="Product Brand" options={dropDownListObject(id ? productBrandList.data : productBrandList.data.filter(item => item.active), "name", "id")} value={productBrandId} setValue={setProductBrandId} required={true} readOnly={readOnly} disabled={(childRecord.current > 0)} />
                  <TextInput name="Product Name" type="text" value={name} setValue={setName} required={true} readOnly={readOnly} disabled={(childRecord.current > 0)} />

                  <div className="grid grid-cols-2">

                    <Portion readonly={readOnly} ProductUomPriceDetails={ProductUomPriceDetails} setProductUomPriceDetails={setProductUomPriceDetails} disabled={(childRecord.current > 0)} />
                  </div>
                  <CheckBox name="Active" value={active} setValue={setActive} readOnly={readOnly} />


                </div>
              </fieldset>
            </div>
          </div>
          <div className='frame overflow-x-hidden'>
            <FormReport
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setId={setId}
              tableHeaders={tableHeaders}
              tableDataNames={tableDataNames}
              data={allData?.data}
              loading={
                isLoading || isFetching
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
