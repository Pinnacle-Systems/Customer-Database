import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAddCustomerMutation, useDeleteCustomerMutation, useGetCustomersQuery, useUpdateCustomerMutation } from '../../../redux/services/createCustomer.service';
import { toast } from 'react-toastify';
import { useGetRelationQuery } from '../../../redux/services/RelationMasterService';
import secureLocalStorage from 'react-secure-storage';
import { PDFViewer } from '@react-pdf/renderer';
import tw from "../../../Utils/tailwind-react-pdf";
import Modal from "../../../UiComponents/Modal";
import bg from "../../../assets/bg.webp"
import FormHeader from '../../../Basic/components/FormHeader';
import moment from 'moment';
import Barcode from 'react-barcode';
import BrowseSingleImage from '../../../Basic/components/BrowseSingleImage';
import { getCommonParams } from '../../../Utils/helper';
import LiveWebCam from '../../../Basic/components/LiveWebCam copy';
import { useGetStateQuery } from '../../../redux/services/StateMasterService';
import { useGetCityQuery } from '../../../redux/services/CityMasterService';
import IdCardPrint from './IdCardPrint.js';
import SingleImageFileUploadComponent from '../../../Basic/components/SingleImageUploadComponent/index.js';

const CreateCustomer = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [imageFile, setImageFile] = useState(null);
    const [page, setPage] = useState(0);
    const [readOnly, setReadOnly] = useState(true);
    const [relatives, setRelatives] = useState([{ type: '', name: '', dob: '', weddingDate: '', phoneNumber: '' }]);
    const [id, setId] = useState('')
    const [picture, setPicture] = useState('')
    const [printModalOpen, setPrintModalOpen] = useState(false);
    const [customerData, setCustomerData] = useState({ customerId: '', name: '', gender: '', email: '', phone: '', city: '', state: '', pin: '', married: '', weddingDate: '', members: '', working: '', age: '', address: '', dob: '', panNo: '', picture: '', whatsNum: '' });
    const [addCustomer] = useAddCustomerMutation();
    const [updateCustomers] = useUpdateCustomerMutation();
    const [removeData] = useDeleteCustomerMutation()
    const [searchValue, setSearchValue] = useState()
    const [phoneOptions, setPhoneOptions] = useState([]);
    const [search, setSearch] = useState('')
    const [isWhatsAppDisabled, setIsWhatsAppDisabled] = useState(false);
    const { branchId, finYearId, companyId } = getCommonParams()
    const [cameraOpen, setCameraOpen] = useState(false);

    const { data: allData, isLoading, isFetching, } = useGetRelationQuery({ searchParams: searchValue });
    const { data: docData } = useGetCustomersQuery({ params: { companyId, isGetNextDocId: true, finYearId } });
    const { data: dt, isLoading: loading, refetch } = useGetCustomersQuery({ params: { companyId, finYearId, branchId } });
    const docId = docData?.data?.docId || '';
    const params = {
        companyId: secureLocalStorage.getItem(
            sessionStorage.getItem("sessionId") + "userCompanyId"
        ),
    };
    const { data: stateList, isLoading: isStateLoading, isFetching: isStateFetching } = useGetStateQuery({ params, searchParams: searchValue });
    console.log(stateList, 'state');
    const { data: city } = useGetCityQuery({ params, searchParams: searchValue });
    useEffect(() => {
        if (dt && dt.data) {
            setPhoneOptions((dt?.data ? dt?.data : []).map(customer => customer.phone));
        }
    }, [dt]);

    const handleCustomerChange = useCallback((e) => {
        const { name, value } = e.target;
        setCustomerData(prev => {
            const updatedCustomers = structuredClone(prev);
            updatedCustomers[name] = value;
            if (name === 'dob') {
                updatedCustomers['age'] = calculateAge(value);
            }
            return updatedCustomers;
        });
    }, []);
    const handlePrint = () => {
        setPrintModalOpen(true);
    }
    const handlePhoneChange = (e) => {
        const phone = e.target.value;
        const existingCustomer = dt?.data?.find(customer => customer.phone === phone);
        setId(existingCustomer?.id ? existingCustomer?.id : '')
        if (existingCustomer) {
            setCustomerData(existingCustomer);
            setImageFile(existingCustomer.image);
            setRelatives(existingCustomer.customerRelations);
            setReadOnly(true)
        } else {
            handleClear();
            setReadOnly(false)
        }
        setSearch(phone)
    };





    const handleRelativeChange = (index, event) => {
        const { name, value } = event.target;
        setRelatives(prev => {
            const newRelatives = structuredClone(prev);
            newRelatives[index][name] = value;
            return newRelatives;
        });

    };
    const calculateAge = (dob) => {

        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };




    const deleteRow = (index) => {
        setRelatives(prev => prev.filter((_, i) => i !== index));
    };

    const addNewRow = () => {
        setRelatives(prev => [
            ...prev,
            { type: '', name: '', dob: '', weddingDate: '' }
        ]);
    };

    const handleClear = () => {
        setCustomerData({ customerId: '', name: '', gender: '', email: '', phone: '', city: '', state: '', pin: '', married: '', weddingDate: '', members: '', working: '', age: '', purchaseDate: '', purchaseValue: '', totalValue: '', address: '', image: '', dob: '', whatsNum: '' });
        setRelatives([{ type: '', name: '', dob: '', weddingDate: '', phoneNumber: '' }]);
        setSearch('')
        setPicture('')

    }
    console.log(imageFile, 'image');
    const saveData = async () => {

        if (!customerData.phone) {
            toast.info("Please fill all required fields...!", {
                position: "top-center",
            });
            return;
        }

        if (!window.confirm("Are you sure you want to save the details?")) {
            return;
        }
        try {
            const formData = new FormData();
            const postData = { ...customerData, relatives: JSON.stringify(relatives), companyId, id, finYearId }

            for (let key in postData) {
                formData.append(key, postData[key]);
            }
            if (imageFile instanceof File) {
                formData.append("image", imageFile);
            } else if (!imageFile) {
                formData.append("isImageDeleted", true);
            }

            let response;
            if (id) {
                response = await updateCustomers({ id, body: formData }).unwrap();
            } else {
                response = await addCustomer({ body: formData }).unwrap();
            }

            if (response?.statusCode === 0) {
                toast.success("Data saved successfully!", {
                    position: "top-center",
                });
                handleClear();
                refetch();
            } else {
                toast.error(response?.message, {
                    position: "top-center",
                });
            }
        } catch (error) {
            toast.error("Error saving data!", {
                position: "top-center",
            });
        }
    };

    const onNew = () => {
        handleClear()
        setReadOnly(false)

    };
    const deleteData = async () => {
        if (id) {
            if (!window.confirm("Are you sure to delete...?")) {
                return;
            }
            try {
                await removeData(id).unwrap();
                setId("");
                toast.success("Deleted Successfully");
                refetch()
            } catch (error) {
                toast.error("something went wrong");
            }
        }
    };

    const handleBlur = () => {
        setIsWhatsAppDisabled(true);
    };

    return (
        <div className=" flex flex-col w-full h-[95%]  justify-between ">
            <Modal isOpen={cameraOpen} onClose={() => setCameraOpen(false)}>
                <LiveWebCam picture={imageFile} setPicture={setImageFile} onClose={() => setCameraOpen(false)} />
            </Modal>
            <Modal isOpen={printModalOpen} onClose={() => setPrintModalOpen(false)} widthClass={"w-[90%] h-[90%]"} >
                <PDFViewer style={tw("w-full h-full")}>
                    <IdCardPrint
                        name={customerData?.name || ""}
                        phoneNumber={customerData.phone || ""}
                        picture={picture}
                        dob={moment.utc(customerData?.dob).format('YYYY-MM-DD')}
                        docId={docId}
                    />
                </PDFViewer>
            </Modal>
            <div className="rounded shadow-md w-[100%] px-2 overflow-auto">
                <div className='flex w-full justify-between bg-gray-400  items-center rounded p-1'>
                    <div className="flex w-auto text- justify-center">
                        <input
                            type="number"
                            name="phone"
                            list="phoneOptions"
                            value={search}
                            onChange={handlePhoneChange}
                            className="w-full border border-gray-300 rounded font-semibold"
                            placeholder='Search phone number'
                            maxlength="10"
                            autoFocus

                        />

                        <datalist id="phoneOptions">
                            {phoneOptions.map((num, index) => (
                                <option key={index} value={num} />
                            ))}
                        </datalist>
                    </div>
                    <FormHeader
                        onNew={onNew}
                        saveData={saveData}
                        setReadOnly={setReadOnly}
                        deleteData={deleteData}
                        onPrint={id ? handlePrint : null}

                    />
                </div>
                <form onSubmit={saveData} className="flex flex-col w-full ">
                    <div className='flex flex-col gap-4  border-[2px] h-[100%]'>

                        <div className='flex  pt-2 w-full h-full'>
                            <div className='flex    w-[100%] '>
                                <div className='grid grid-cols-1 md:grid-cols-6 w-[100%]   gap-2 text-[12px] '>
                                    <div className="flex flex-col">
                                        <label htmlFor="phone" className="text-black">Phone Number: <span className="text-red-600">*</span></label>
                                        <input
                                            readOnly={readOnly}
                                            type="text"
                                            name="phone"
                                            maxLength="10"
                                            list="phoneOptions"
                                            value={customerData.phone || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="whatsapp" className="text-black">WhatsApp Number:</label>
                                        <input
                                            readOnly={readOnly}
                                            type="text"
                                            name="whatsNum"
                                            maxLength="10"
                                            list="phoneOptions"
                                            value={customerData.whatsNum || customerData.phone}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-300 rounded"
                                            onBlur={handleBlur}
                                            disabled={!customerData.phone} // Disable input if phone number is available
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="customerId" className="text-black">Customer ID : <span className='text-red-600'>*</span></label>
                                        <input readOnly={readOnly}
                                            type="text"
                                            name="customerId"
                                            value={docId || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-300 rounded"
                                            placeholder="ID"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-black">Name :  <span className='text-red-600'>*</span></label>
                                        <input readOnly={readOnly}
                                            type="text"
                                            name="name"
                                            value={customerData?.name || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-300 rounded"
                                            placeholder="Name"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="gender" className="text-black">Gender :  <span className='text-red-600'>*</span></label>
                                        <select disabled={readOnly}
                                            id="gender"
                                            name="gender"
                                            value={customerData?.gender || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                                            required
                                        >
                                            <option value="" className='text-gray-100'>
                                                <span className=''>Select</span></option>

                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value='Others'>Others</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="dob" className="text-black">DOB : <span className='text-red-600'>*</span></label>

                                        <input readOnly={readOnly}
                                            type="date"
                                            name="dob"
                                            value={moment.utc(customerData?.dob).format('YYYY-MM-DD')}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className={`w-full px-1 py-1 border border-gray-300 rounded $`}
                                            required

                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="age" className="text-black">Age : <span className='text-red-600'>*</span></label>
                                        <input readOnly={readOnly}
                                            type="text"
                                            name="age"
                                            value={customerData?.age || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-300 rounded"
                                            disabled
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="text-black">Email:</label>
                                        <input readOnly={readOnly}
                                            type="text"
                                            name="email"
                                            value={customerData?.email || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-300 rounded"
                                            placeholder="Email"
                                        />

                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="panNo" className="text-black">PanNo:</label>
                                        <input readOnly={readOnly}
                                            type="text"
                                            name="panNo"
                                            value={customerData?.panNo || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-300 rounded"
                                            placeholder="panNo"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="working" className="text-black">Working Status:</label>
                                        <select disabled={readOnly}
                                            id="working"
                                            name="working"
                                            value={customerData?.working || customerData?.
                                                workingStatus
                                                || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-3 py-1 border border-gray-300 rounded  focus:outline-none focus:ring focus:border-blue-300"
                                        >
                                            <option readOnly={readOnly} value="">Select</option>
                                            <option readOnly={readOnly} value="working">Working</option>
                                            <option readOnly={readOnly} value="notWorking">Not Working</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="married" className="text-black">Married Status:</label>
                                        <select disabled={readOnly}
                                            id="married"
                                            name="married"
                                            value={customerData?.married || customerData?.marriedStatus
                                                || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-3 py-1 border border-gray-300 rounded  focus:outline-none focus:ring focus:border-blue-300"
                                        >
                                            <option value="">select</option>
                                            <option value="married">Married</option>
                                            <option value="notMarried">Not Married</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="weddingDate" className="text-black">Wedding Date:</label>
                                        <input readOnly={readOnly}
                                            type="date"
                                            name="weddingDate"
                                            value={moment.utc(customerData?.weddingDate).format('YYYY-MM-DD')}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className={`w-full px-1 py-1 border border-gray-300 rounded ${customerData?.married !== 'married' ? 'bg-gray-200' : 'bg-white'}`}
                                            disabled={customerData?.married !== 'married'} />
                                    </div>



                                    <div className="flex flex-col">
                                        <label htmlFor="state" className="text-black">State:</label>
                                        <select disabled={readOnly}
                                            type="text"
                                            name="state"
                                            id='state'
                                            value={customerData?.state || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-400 rounded  focus:outline-none focus:ring focus:border-blue-300"
                                            readOnly={readOnly}>
                                            <option className='py-3' value="" readOnly={readOnly} >Select</option>
                                            {stateList && !isLoading && !isFetching ? (
                                                (stateList?.data ? stateList?.data : []).map((relation) => (
                                                    <option key={relation.id
                                                    } value={relation.name}>{relation.name}</option>
                                                ))
                                            ) : (
                                                <option value="">Loading...</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="state" className="text-black">City:</label>
                                        <select disabled={readOnly}
                                            type="text"
                                            name="city"
                                            id='city'
                                            value={customerData?.city || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-400 rounded  focus:outline-none focus:ring focus:border-blue-300"
                                            readOnly={readOnly}>
                                            <option className='py-3' value="" readOnly={readOnly} >Select</option>
                                            {city && !isLoading && !isFetching ? (
                                                (city?.data ? city?.data : []).map((relation) => (
                                                    <option key={relation.id} value={relation.name}>{relation.name}</option>
                                                ))
                                            ) : (
                                                <option value="">Loading...</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="pin" className="text-black">PIN Code:</label>
                                        <input readOnly={readOnly}
                                            type="text"
                                            name="pin"
                                            value={customerData?.pin || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-300 rounded"
                                            placeholder="PIN Code"
                                        />
                                    </div>
                                    <div className="flex w-[40vw]  h-[2.75rem] text-[12px] flex-col">
                                        <label htmlFor="address" className="text-black">Address:</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={customerData?.address || ''}
                                            onChange={(e) => handleCustomerChange(e)}
                                            className="w-full px-1 py-1 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 w-[18%]'>
                                    <div className="flex justify-center items-center px-2 rounded">
                                        <SingleImageFileUploadComponent setWebCam={setCameraOpen} disabled={readOnly} imageFile={imageFile} setImageFile={setImageFile} />
                                    </div>
                                    <div className="flex justify-center items-center rotate-90 h-3/4">
                                        <Barcode value={docId} height={100} displayValue={false} width={1.25} />
                                    </div>
                                </div>



                            </div>

                        </div>

                        <table className="w-[100%] border-collapse border border-gray-300 overflow-scroll">
                            <thead>
                                <tr className="bg-gray-300 text-[14px] border">
                                    <th className="p-2 w-3">S/no</th>
                                    <th className="border border-gray-300 px-1 py-1">Relationship type</th>
                                    <th className="border border-gray-300 px-1 py-1">Name</th>
                                    <th className="border border-gray-300 px-1 py-1">Contact Number</th>
                                    <th className="border border-gray-300 px-1 py-1">Date of Birth</th>
                                    <th className="border border-gray-300 px-1 py-1">Wedding Date</th>

                                    <th className="border border-gray-300 px-1 py-1"> <button
                                        type="button"
                                        onClick={addNewRow}
                                        className="bg-blue-500 text-white py-1 px-1 rounded hover:bg-blue-600"
                                        disabled={readOnly} >
                                        +
                                    </button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {relatives.map((relative, index) => (
                                    <tr key={index} className='text-[12px] even:bg-gray-200 odd:bg-white'>

                                        <td className="border border-gray-300 px-1 ">
                                            {index + 1}
                                        </td>
                                        <select disabled={readOnly}
                                            id={`type-${index}`}
                                            name="type"
                                            value={relative.type}
                                            onChange={(e) => handleRelativeChange(index, e)}
                                            className="w-full px-1 py-1 border border-gray-400 rounded  focus:outline-none focus:ring focus:border-blue-300"
                                            readOnly={readOnly}>
                                            <option className='py-3' value="" readOnly={readOnly} >Select</option>
                                            {allData && !isLoading && !isFetching ? (
                                                (allData?.data ? allData?.data : []).map((relation) => (
                                                    <option key={relation.id} value={relation.name}>{relation.name}</option>
                                                ))
                                            ) : (
                                                <option value="">Loading...</option>
                                            )}
                                        </select>
                                        <td className="border border-gray-300 px-1 ">
                                            <input readOnly={readOnly}
                                                type="text"
                                                name="name"
                                                value={relative.name || ''}
                                                onChange={(e) => handleRelativeChange(index, e)}
                                                className="w-full  px-1 rounded h-5 focus:outline-2 focus-visible:outline-slate-400"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-1 ">
                                            <input readOnly={readOnly}
                                                type="number"
                                                name="phoneNumber"
                                                value={relative.phoneNumber || ''}
                                                onChange={(e) => handleRelativeChange(index, e)}
                                                className="w-full px-1 py-1 border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-1">
                                            <input readOnly={readOnly}
                                                type="date"
                                                name="dob"
                                                value={moment.utc(relative.dob).format('YYYY-MM-DD')}
                                                onChange={(e) => handleRelativeChange(index, e)}
                                                className="w-full px-1  border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-1 py-1">
                                            <input readOnly={readOnly}
                                                type="date"
                                                name="weddingDate"
                                                value={moment.utc(relative.weddingDate).format('YYYY-MM-DD')}
                                                onChange={(e) => handleRelativeChange(index, e)}
                                                className="w-full px-1  border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-1  text-center">
                                            <button
                                                type="button"
                                                onClick={() => deleteRow(index)}
                                                className="bg-red-500 text-white  px-1 rounded hover:bg-red-600 "
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {Array.from({ length: rowsPerPage - relatives.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length }).map((_, index) => (
                                    <tr className="border even:bg-gray-200 odd:bg-white h-[1.65rem] shadow-lg" key={index}>
                                        {Array.from({ length: 7 }).map((_, index) => (
                                            <td key={index} className="border"> </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>


                </form >
            </div >



        </div >
    );
};

export default CreateCustomer;





