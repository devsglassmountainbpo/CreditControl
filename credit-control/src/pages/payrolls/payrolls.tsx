import {
    Modal,
    Select,
    Table,
    TextInput,
    Button,
    Label, Badge,
    Card, Alert
} from "flowbite-react";
import type { FC } from "react";
import React, { useEffect, useState } from "react";

import { HiTable } from "react-icons/hi";
import {
    HiPlus,
} from "react-icons/hi";

import NavbarSidebarLayout2 from "../../layouts/navbar-sidebar2";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Calendar } from 'react-bootstrap-icons';




import { HiIdentification } from "react-icons/hi";
import { HiCreditCard } from "react-icons/hi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";





const created_user3 = localStorage.getItem("badgeSession") || "";
const created_user2 = (created_user3 ? CryptoJS.AES.decrypt(created_user3, "Tyrannosaurus") : "");
const created_user = (created_user2 ? created_user2.toString(CryptoJS.enc.Utf8) : "");


const PayrollAll: FC = function () {

    const [sharedState, setSharedState] = useState(false);


    console.log('$%^CreateUser', created_user, setSharedState)
    return (
        <NavbarSidebarLayout2 isFooter={true}>
            <Payroll
                sharedState={sharedState} />
        </NavbarSidebarLayout2>
    );
};



const Payroll: FC<any> = function ({ sharedState }: any) {



    interface User {
        name: string;
        id: string;
        header: string | number | boolean;  // Especifica los tipos permitidos
    }

    interface Users {
        name: string;
        id: string;
        id_bank: string;
        badge: string;
        reference_number: string;
        active: string;
        credit_start_date: string;
        credit_end_date: string;
        status_credit: string;
        pending_payment: string;
        credit_total: string;
        total_payment: number;
        date_created: string;
    }


    const [dataGraphis, setDataGraphis] = useState<User[]>([]);
    const [Filtrado, setFiltrado] = useState<Users[]>([]);



    //filtrando datos para los reportes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [graphisRes] = await Promise.all([
                    axios.get('http://127.0.0.1:5002/credit/payments'),
                ]);
                setDataGraphis(graphisRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [sharedState]);

    useEffect(() => {
        const fetchData3 = async () => {
            try {
                const [dataPayroll] = await Promise.all([
                    axios.get('http://127.0.0.1:5002/credit/list_payrolls'),
                ]);
                setFiltrado(dataPayroll.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData3();
    }, [sharedState]);


    const [isReady, setIsReady] = useState(false);

    useEffect(() => {


        const handleReadyStateChange = () => {
            setIsReady(true)
            if (document.readyState === 'complete') {
                console.log('listo');
                setIsReady(true);
            }
        };
        document.addEventListener('readystatechange', handleReadyStateChange);


    }, []);

    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (rowIndex: any, item: any) => {

        console.log('=======================> enviamos este item', item)
        setExpandedRow(rowIndex === expandedRow ? null : rowIndex);
    };


    useEffect(() => {
        if (isReady) {
            const checkboxes: any = document.querySelectorAll('#devices input[type="checkbox"]');
            if (checkboxes.length > 0) {
                console.log('listo');
                checkboxes[0].click();

            }
        }
    }, [sharedState]);




    const columnOrder = ['id', 'name', 'total_records', 'pending_count', 'Completed_count'];

    return (
        <div>
            <div className="block items-center justify-between border-b rounded-tl-2xl rounded-tr-2xl border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-700 sm:flex"
                style={{
                    backgroundImage: `linear-gradient(rgba(76, 175, 80, 1.7), rgba(139, 195, 74, 0.7)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 210'%3E%3Cg transform='rotate(120 90 90)'%3E%3Crect x='2' y='80' width='90' height='60' fill='%238BC34A'/%3E%3Crect x='60' y='30' width='70' height='40' fill='%239CCC65'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '350px 250px', // Adjust the size of the SVG pattern
                    backgroundRepeat: 'repeat', // Ensure the pattern repeats across the strip
                    backgroundPosition: 'center',
                    position: 'relative',
                    height: '120px', // Set the height of the strip
                    color: 'white', // Ensure text is visible against the dark background
                }}

            >               <div className="mb-1 w-full">
                    <div className="mb-4">
                        <h1 style={{ zoom: 0.90 }} className="text-xl ml-4 mt-4 font-semibold text-white-900 dark:text-white sm:text-2xl">
                            List of banks
                        </h1>
                    </div>
                    <div className="sm:flex" style={{ zoom: 0.90 }}>
                        <div className="mb-3 ml-4 hidden items-center dark:divide-white-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">


                        </div>

                        <div className="ml-auto mr-4 flex items-center space-x-2 sm:space-x-3">
                            <AddTaskModal
                                sharedState={sharedState}
                            />
                        </div>

                    </div>
                </div>
            </div>


            <div className="overflow-x-auto">
                <table className="w-full">
                    <tr>
                        <td className="text-center">
                            <div className="flex justify-center items-center mb-2">
                            </div>
                        </td>
                        {/* <td className="text-right">
                            <button onClick={exportToGraphis} className="dark:bg-gray-800 dark:hover:bg-indigo-500 hover:bg-indigo-500 bg-indigo-700 text-white font-bold py-1 px-1 rounded-full right-0 top-10">
                                <HiTable className="h-7 w-7" />
                            </button>
                        </td> */}
                    </tr>
                </table>

                <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                    <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" hoverable>
                        <Table.Head >
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                id
                            </Table.HeadCell>
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                name
                            </Table.HeadCell>
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                Total records
                            </Table.HeadCell>
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                Pending
                            </Table.HeadCell>
                            <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                                Completed
                            </Table.HeadCell>

                        </Table.Head>

                        <Table.Body>
                            {dataGraphis.map((row: any, rowIndex: any) => (
                                <React.Fragment key={rowIndex}>
                                    <Table.Row
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-white"
                                        onClick={() => handleRowClick(rowIndex, row)}
                                    >
                                        {columnOrder.map((key, index) => (
                                            <Table.Cell key={index} className="py-4 px-6 font-semibold">

                                                {typeof row[key] === 'number' && row[key] <= 30 ? (
                                                    <>
                                                        <span className="bg-gray-400 text-white font-semibold px-2 py-0.5 rounded-full dark:bg-green-400 dark:text-white">
                                                            {row[key]}
                                                        </span>
                                                    </>

                                                ) : (
                                                    row[key]
                                                )}
                                            </Table.Cell>
                                        ))}
                                    </Table.Row>
                                    {expandedRow === rowIndex && (
                                        <Table.Row className="bg-gray-100 dark:bg-gray-900" >
                                            <Table.Cell colSpan={Object.keys(row).length}>
                                                <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                                                    <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" hoverable>
                                                        <Table.Head className="text-xs  uppercase bg-primary-500 text-white dark:bg-gray-700 dark:text-gray-400 ">
                                                            <Table.HeadCell>Id  Payroll</Table.HeadCell>
                                                            <Table.HeadCell>Fullname</Table.HeadCell>
                                                            <Table.HeadCell>Badge</Table.HeadCell>
                                                            <Table.HeadCell>reference number</Table.HeadCell>
                                                            <Table.HeadCell>Credit Total</Table.HeadCell>
                                                            <Table.HeadCell>total of unpaid installments </Table.HeadCell>
                                                            <Table.HeadCell>credit start date</Table.HeadCell>
                                                            <Table.HeadCell>credit end date</Table.HeadCell>
                                                            <Table.HeadCell>date created</Table.HeadCell>
                                                            <Table.HeadCell>Status</Table.HeadCell>
                                                            <Table.HeadCell>Print</Table.HeadCell>
                                                            <Table.HeadCell>Action</Table.HeadCell>
                                                        </Table.Head>


                                                        <Component data={row} className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hover:bg-primary-400'></Component>

                                                    </Table>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </React.Fragment>
                            ))}
                        </Table.Body>


                    </Table>
                </div>
            </div>

        </div>

    );
};


const Component = function (data: any) {

    interface User {
        name_: string;
        id: string;
        id_bank: string;
        badge: string;
        reference_number: string;
        active: string;
        credit_start_date: string;
        credit_end_date: string;
        status_credit: string;
        pending_payment: string;
        credit_total: string;
        total_payment: number;
        date_created: string;
        photo: string;
    }
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<< este el item que recibimos', data)

    const idFilter = data.data.id;
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<< este el item que que nos queda despues de filtrar', idFilter)

    const [dataGraphis, setDataGraphis] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [graphisRes] = await Promise.all([
                    axios.get('http://127.0.0.1:5002/credit/list_payrolls'),
                ]);

                setDataGraphis(graphisRes.data);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredData = dataGraphis.filter(user => user.id_bank == idFilter);
    console.log(idFilter);

    console.log('Un dolor de cabeza menos :D', filteredData);

    function goodDisplay(dateString: string): string {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son 0-11
        const year = String(date.getUTCFullYear()).slice(-2); // Obtener los últimos 2 dígitos del año

        return `${day}/${month}/${year}`;
    }

    return (
        <>
            {filteredData.map((user, index) => (
                <Table.Row key={user.id} className="">
                    <Table.Cell className="p-4 whitespace-nowrap ">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {user.id}

                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className=" flex text-base font-semibold text-gray-900 dark:text-white">
                                <div className='flex realtive mr-4'
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        overflow: 'hidden',
                                        borderRadius: '20%',
                                    }}
                                >
                                    <img
                                        className='realtive'
                                        src={'https://hr.glassmountainbpo.com/ap/employee/document/foto/' + (user.photo !== '' ? user.photo : 'user.png')}
                                        alt="user"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />

                                </div>
                                <div className="mt-3">
                                    {user.name_}
                                </div>


                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {user.badge}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {user.reference_number}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                ${user.credit_total}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {user.total_payment}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {goodDisplay(user.credit_start_date)}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {goodDisplay(user.credit_end_date)}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p-4 whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                {goodDisplay(user.date_created)}
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="p whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">

                                {user.status_credit == 'Pending' ? <>
                                    <Badge className="bg-red-400 dark:bg-red-500 dark:text-white text-white">{user.status_credit}</Badge>
                                </> : <>
                                    <Badge className="bg-indigo-400">{user.status_credit}</Badge>
                                </>}

                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className=" whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="flex text-base font-semibold text-gray-900 dark:text-white">

                                {/* <Button className="bg-yellow-300 hover:bg-yellow-400">   <HiTable className="text-xl"></HiTable></Button> */}

                                <ListPayments data={[filteredData[index]]} id_filter={user.id} />
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="flex text-base font-semibold text-gray-900 dark:text-white">

                                <Button>Edit</Button>
                            </div>
                        </div>
                    </Table.Cell>
                </Table.Row>
            ))}
        </>
    )
}



const AddTaskModal: FC<any> = function ({ sharedState, updateSharedState }: any) {
    const [isOpen, setOpen] = useState(false);
    const [supBadge, setSupBadge] = useState<any>('');
    const [result, setResult] = useState<any>([]);
    const [supervisorName, setSupervisorName] = useState('');

    const [nameBank, setNameBank] = useState('');
    const [badge, setBadge] = useState<any>(''); //Badge

    //credit personal information
    const [credit, setCredit] = useState('');
    const [totaInstallment, setTotalInstallment] = useState('');

    //DataTime Collection
    const [credit_start, setCreditStart] = useState('');
    const [credit_end, setCreditEnd] = useState('');


    const [formattedDate, setFormattedDate] = useState(''); // Fecha formateada
    const [paymentDates, setPaymentDates] = useState<string[]>([]); // Fechas de pago

    const [acountNumber, setAcountNumber] = useState('');
    const [bankCheck, setBankCheck] = useState('');




    console.log('fechas de calculo de cuotas', credit_start, credit_end)
    console.log('Credit personal information', totaInstallment, credit)




    useEffect(() => {
        console.log('Recibimos el date_created', credit_start);

        const formatDate = (dateString: string): string => {
            const date = new Date(dateString);
            const formattedYear = date.getUTCFullYear();
            const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
            const formattedDay = String(date.getUTCDate()).padStart(2, '0');
            const formattedHours = String(date.getUTCHours()).padStart(2, '0');
            const formattedMinutes = String(date.getUTCMinutes()).padStart(2, '0');
            const formattedSeconds = String(date.getUTCSeconds()).padStart(2, '0');

            return `${formattedYear}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        };

        const generatePaymentDates = (startDate: string, totalInstallments: any): string[] => {
            const startDateObj = new Date(startDate);
            const paymentDates: string[] = [];

            for (let i = 0; i < totalInstallments; i++) {
                let paymentDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + i, 14);
                paymentDates.push(formatDate(paymentDate.toISOString()));

                paymentDate = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + i + 1, 0);
                paymentDate.setDate(paymentDate.getDate() - 2);
                paymentDates.push(formatDate(paymentDate.toISOString()));
            }

            return paymentDates;
        };

        const formatted: any = formatDate(credit_start);
        setFormattedDate(formatted); // Actualizar la fecha formateada en estado

        // Asegurarse de que la fecha formateada está actualizada antes de generar las fechas de pago
        const allDatesInstallment: any = generatePaymentDates(formatted, totaInstallment);
        setPaymentDates(allDatesInstallment); // Establecer las fechas de pago en el estado


        setCreditEnd(paymentDates[paymentDates.length - 1]); // Establece la última fecha de pago

    }, [credit_start, totaInstallment]); // Dependencias del useEffect



    //Definiendos las cuotas



    console.log('como transformamos del start date', formattedDate, credit, totaInstallment);
    console.log('total de cuotas a cancelar', paymentDates);






    // Bank Check Payment
    const [bankCheckPayment, setBankCheckPayment] = useState('');
    // Bank  account n
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    // Bank List
    interface BankData {
        id: number;
        name: string;
    }
    // Bank List
    const [bankData, setBankData] = useState<BankData[]>([]);


    const [methodPayment, setMethodCategory] = useState('');
    // const [idCategory, setIdCategory] = useState('');

    console.log('estas son la categorias seleccionadas', methodPayment)

    const url = `http://127.0.0.1:5002/credit/hired_fullname/`;

    const handleTrack = () => {
        if (badge.length !== 0) {
            // Do something with value

            axios.get(url + badge)
                .then((response) => {
                    setResult(response.data)
                    // axios returns API response body in .data
                });
        }
    };


    //@_____________________Get  link banks _________________________

    useEffect(() => {
        axios.get('http://127.0.0.1:5002/creditControl/listBanks')
            .then(res => {

                // Filter data where supervisorBadge equals created_user
                setBankData(res.data);

            })
    }, [sharedState, , created_user]); // Add userLevel and created_user to the dependency array



    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === "Enter") {
            handleTrack();
        }
    };

    const resetFields = () => {
        setNameBank('');
        setSupBadge('');
        setCredit('');
        setSupervisorName('');
    };



    const url2 = `http://127.0.0.1:5002/creditControl/addBank`;
    const handleSubmit = async (e: React.FormEvent) => {
        if (!nameBank) {
            alert('Enter a valid category name')
        } else if (!credit) {
            alert('Enter a valid status!')
        } else {
            e.preventDefault()
            try {
                const response = await axios.post(url2, {
                    nameBank,
                    credit,
                    created_user,
                    methodPayment,
                    bankCheckPayment,
                    bankAccountNumber,
                })
                if (response.status == 200) {
                    const responseData = response.data;
                    updateSharedState(!sharedState);

                    if (responseData.message === "ok") {
                        setOpen(false);
                        resetFields();
                        alert('Brand created successfully!')
                    } else {
                        console.log("Fatal Error");
                    }
                }
            } catch (error) {
                console.log(error);
                setOpen(false)
            }
        }
    }


    const [selectedBankId, setSelectedBankId] = useState<number | null>(null);


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedId = selectedOption.getAttribute('data-id');
        setNameBank(e.target.value);
        setSelectedBankId(selectedId ? parseInt(selectedId, 10) : null);

        console.log('este si el banco seleccionado : ', selectedBankId);

        const filterData: any = bankData.filter((item: any) => item.id == selectedId);

        setMethodCategory(filterData[0].method);
        setAcountNumber(filterData[0].bank_account);
        setBankCheck(filterData[0].bank_check);
        console.log('estaaaa es el filtro de los bancos', filterData);
    };



    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (rowIndex: any) => {
        console.log('Clicked row index: ', rowIndex)
        setExpandedRow(rowIndex === expandedRow ? null : rowIndex);
    };
    const handleInputClick = () => {
        if (credit_start === '') {
            alert('Insert credit start date')
        }
    };




    return (
        <>
            <Button color="primary" onClick={() => { setOpen(true) }}>
                <div className="flex items-center gap-x-3">
                    <HiPlus className="text-xl" />
                    Add Payrolls
                </div>
            </Button>

            <Modal onClose={() => setOpen(false)} show={isOpen} >
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                    <strong >Add new payroll</strong>
                </Modal.Header>
                <Modal.Body>

                    <div className="flex ">
                        <Button className='bg-green-300' onClick={() => handleRowClick(0)}>

                            {
                                expandedRow == 0 ?

                                    < HiIdentification className="text-2xl" />
                                    :
                                    < HiIdentification className="text-1xl" />

                            }

                        </Button>
                        <Label className="text-gray-800 dark:text-gray-100 mt-2 ml-2 font-semibold">Personal Information</Label>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {expandedRow === 0 && (
                            <>
                                {/* Personal Information Section */}
                                <div className="col-span-1 sm:col-span-2">

                                    <div className="col-span-1 sm:col-span-2 flex justify-center">
                                        <div className="relative bg-gray-100 rounded-xl" style={{ width: '125px', height: '115px', overflow: 'hidden', borderRadius: '7.5%' }}>
                                            <img
                                                className="relative"
                                                src={'https://hr.glassmountainbpo.com/ap/employee/document/foto/' + (!result.photo || result.photo === 'undefined' ? 'user.png' : result.photo)}
                                                alt="user"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <Label className="text-gray-800 font-extrabold" htmlFor="badge">Badge</Label>
                                        <TextInput
                                            className="mt-2"
                                            id="badgeAddUser"
                                            name="badgeAddUser"
                                            placeholder="3814"
                                            value={badge}
                                            onChange={e => setBadge(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="fullname">Full name</Label>
                                    <div className="mt-1">
                                        <TextInput
                                            id="fullname"
                                            name="fullname"
                                            placeholder="John Doe"
                                            value={result.fullname}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="position">Position</Label>
                                    <div className="mt-1">
                                        <TextInput
                                            id="position"
                                            name="position"
                                            placeholder="Developer"
                                            value={result ? result.name_job : ""}
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="department">Department</Label>
                                    <div className="mt-1">
                                        <TextInput
                                            id="department"
                                            name="department"
                                            placeholder="IT"
                                            value={result ? result.name_rol : ""}
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="name">Banks Available</Label>
                                    <div className="mt-1">
                                        <Select
                                            id="name"
                                            name="name"
                                            value={nameBank}
                                            onChange={handleSelectChange}
                                        >
                                            <option value=''>--SELECTED--</option>
                                            {bankData.sort((a, b) => a.name.localeCompare(b.name)).map((element) => (
                                                <option key={element.id} value={element.name} data-id={element.id.toString()}>{element.name}</option>
                                            ))}

                                        </Select>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Payment Information Section */}
                        <div className="col-span-1 sm:col-span-2">

                            <div className="flex mt-3">
                                <Button className='bg-green-300' onClick={() => handleRowClick(3)}>

                                    {expandedRow == 3 ?
                                        < HiCreditCard className="text-2xl" />
                                        :
                                        < HiCreditCard className="text-1xl" />

                                    }
                                </Button>
                                <Label className="text-gray-800 dark:text-gray-100 mt-3 ml-2 font-semibold">Payment Information</Label>
                            </div>

                            {expandedRow === 3 && (<>

                                <div className=" mt-2 grid grid-cols-1 sm:grid-cols-1 gap-1">
                                    <div>

                                        <Alert color="success" className="mt-1" >
                                            Method Payment: {methodPayment}<br></br>
                                            <span></span>
                                        </Alert>
                                    </div>
                                    <div>
                                        <div className="mt-">

                                            <Alert className="mt- bg-black-500" color="success">
                                                Bank Account Number: {acountNumber}<br></br>
                                                <span></span>
                                            </Alert>
                                        </div>

                                    </div>

                                </div>

                            </>)}

                        </div>

                        {/* Payment due */}

                        <div className="col-span-1 sm:col-span-2">
                            <div className="flex">

                                {expandedRow == 1 ?

                                    <Button className='bg-green-300' onClick={() => handleRowClick(1)}>
                                        <HiOutlineCurrencyDollar className="text-2xl" />
                                    </Button>
                                    :
                                    <Button className='bg-green-300' onClick={() => handleRowClick(1)}>
                                        <HiOutlineCurrencyDollar className="text-1xl" />
                                    </Button>

                                }
                                <Label className="text-gray-800 dark:text-gray-100 mt-2 ml-2 font-semibold">Credit information</Label>
                            </div>
                            <div>
                                {expandedRow === 1 && (
                                    <div>
                                        <div className="mt-2">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <Label htmlFor="status">Total Credit</Label>
                                                    <div className="mt-1">
                                                        <TextInput
                                                            value={credit}
                                                            onChange={(e) => setCredit(e.target.value)}
                                                            required
                                                        >

                                                        </TextInput>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="status">Credit Start Date</Label>
                                                    <div className="mt-1">
                                                        <TextInput
                                                            type='date'

                                                            onChange={(e: any) => setCreditStart(e.target.value)}
                                                            required
                                                        >
                                                        </TextInput>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <Label htmlFor="adminUser">Total per installment</Label>
                                                    <div className="mt-1">
                                                        <TextInput
                                                            id="supBadge"
                                                            name="supBadge"
                                                            placeholder=""
                                                            value={totaInstallment}

                                                            onChange={(e) => setTotalInstallment(e.target.value)}
                                                            onClick={handleInputClick}
                                                            readOnly={credit_start == ''}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label htmlFor="adminUser">Credit End Date</Label>
                                                    <div className="mt-1">
                                                        <TextInput
                                                            value={paymentDates[paymentDates.length - 1] || ''}
                                                            type="text"
                                                            readOnly
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex bg-primary-500 rounded mt-4 p-4">
                                            <h1 className="text-white mx-2">Payment Dates Timeline</h1>
                                            {paymentDates.length > 0 && (
                                                <div className="flex-grow border-t border-white">
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-white text-center p-2 bg-yellow-300 rounded">
                                                            <Calendar /><span>Start Date: {paymentDates[0]}</span>
                                                        </div>
                                                        {paymentDates.length > 1 && (
                                                            <div className="text-white text-center p-2 bg-green-400 rounded">
                                                                <Calendar /><span>End Date: {paymentDates[paymentDates.length - 1]}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                )}
                            </div>

                        </div>
                        {/* User Status Section */}

                        <div className="col-span-1 sm:col-span-2">
                            {/* <strong className="text-gray-800 dark:text-gray-100">User Status</strong> */}
                            <div className="flex">
                                <Button className='bg-green-300' onClick={() => handleRowClick(4)}>
                                    {expandedRow == 4 ?

                                        <HiOutlineUserCircle className="text-2xl" />
                                        :
                                        <HiOutlineUserCircle className="text-1xl" />
                                    }
                                </Button>
                                <Label className="text-gray-800 dark:text-gray-100 mt-2 ml-2 font-semibold">Created by user</Label>
                            </div>
                            <div className="mt-2">
                                {expandedRow === 4 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-1">
                                        <div>
                                            <div className="mt-1">

                                                <Alert className="items-center text-3xl font-extrabold"
                                                >
                                                    <Label htmlFor="status" className="mr-2 dark:text-indigo-500 font-extrabold">Badge:</Label>
                                                    {created_user}
                                                </Alert>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        color="primary"
                        onClick={(e) => { handleSubmit(e) }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
};





const ListPayments: FC<any> = function ({ data }: any) {

    const [isOpen, setOpen] = useState(false);


    return (
        <>
            <Button className="bg-yellow-300 hover:bg-yellow-400" onClick={() => { setOpen(true) }}>   <HiTable className="text-xl"></HiTable></Button>
            <Modal onClose={() => setOpen(false)} show={isOpen} className="w-full sm:grid-cols-3">
                <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700 text-gray-200">
                    <Label>Payment management!</Label>
                </Modal.Header>
                <Modal.Body>
                    <div className="overflow-x-auto mt-0 bg-gray-100 rounded-md">
                        <Card className="max-w-auto">
                            <div className="flex">
                                <div className='realtive mr-4'
                                    style={{
                                        width: '125px',
                                        height: '95px',
                                        overflow: 'hidden',
                                        borderRadius: '20%',
                                    }}
                                >
                                    <img
                                        className='realtive'
                                        src={'https://hr.glassmountainbpo.com/ap/employee/document/foto/' + (data[0].photo !== '' ? data[0].photo : 'user.png')}
                                        alt="user"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>

                                <h5 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">{data[0].name_}</h5>
                                <h5 className="mb-1 text-right text-2xl font-bold text-gray-700 dark:text-white pl-2">Badge: {data[0].badge}</h5>

                            </div>
                            <h6 className="mb-1 text-1xl font-bold text-gray-900 dark:text-white">Bank Name: {data[0].name_bank}</h6>
                            <p className="mb-1 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                Method Payment: {data[0].method_payment}
                                <p className="mb-0 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                    Check Number: {data[0].bank_check_n}
                                </p>
                                <p className="mb-0 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                    Number Account: {data[0].account_n}
                                </p>
                            </p>
                            <h6 className="mb-2 text-1xl font-bold text-gray-900 dark:text-white">Details</h6>
                            <p className="mb-5 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                Reference Number: {data[0].reference_number}
                                <p className="mb-0 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                    Due: ${data[0].due}
                                </p>
                                <p className="mb-0 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                    Active: {data[0].active == "1" ? "Yes" : "No"}
                                </p>
                                <div className="flex">
                                    <p className=" flex mb-0 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                                        Credit Status {data[0].status_credit == 'Pending' ? <>
                                            <a className="ml-2 mr-4 px-2 py-1 font-bold  rounded-full bg-yellow-300 text-gray-700 flex text-sm">{data[0].status_credit}</a>
                                        </> : <>
                                            <a className="ml-2 mr-4 px-2 py-1 font-bold  rounded-full bg-green-500 text-white flex text-sm">{data[0].status_credit}</a>
                                        </>}
                                    </p>
                                </div>
                            </p>

                            <div className="items-center pt-7 justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
                                    <div className="text-left cursor-pointer bg-primary-200 rounded-lg px-12 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto">
                                        <div className="mb-1 text-sm">Credit Total</div>
                                        <div className="-mt-1 font-sans text-1xl font-semibold">${data[0].credit_total}</div>
                                    </div>
                                    <div className="text-left cursor-pointer bg-green-200 rounded-lg px-12 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto">
                                        <div className="mb-1 text-sm">Pending Payment
                                        </div>
                                        <div className="-mt-1 ml-9 font-sans text-1xl font-semibold">{data[0].pending_payment}</div>
                                    </div>
                            </div>
                        </Card>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    );
};




export default PayrollAll;