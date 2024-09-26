
import NavbarSidebarLayout2 from '../../layouts/navbar-sidebar2'
import { Label, Table, TextInput } from 'flowbite-react';
import { defaultersBackgroundImage } from '../../utils/constants';
import { CreditRecord } from '../../types';
import { formatDateHelper } from '../../utils/helpers';
import useCreditData from '../../hooks/useCreditData';
import { useState } from 'react';
import PaginationDefault from '../../components/defaults/Pagination';



const Defaults = () => {

    const { filteredData, filterByBadge } = useCreditData();
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    // Get current records
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    // Paginate records
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <NavbarSidebarLayout2 isFooter={true}>
            <div className="block items-center justify-between border-b rounded-tl-2xl rounded-tr-2xl border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-700 sm:flex"
                style={{
                    backgroundImage: defaultersBackgroundImage,
                    backgroundSize: '350px 250px',
                    backgroundRepeat: 'repeat',
                    backgroundPosition: 'center',
                    position: 'relative',
                    height: '120px',
                    color: 'white',
                }}>
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <h1 style={{ zoom: 0.90 }} className="text-xl ml-4 mt-4 font-semibold text-white-900 dark:text-white sm:text-2xl">
                            List of Defaulters
                        </h1>
                    </div>
                    <div>
                        <div className="mb-3 ml-4 hidden items-center dark:divide-white-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                            <form className="lg:pr-3">
                                <Label htmlFor="users-search" className="sr-only">
                                    Search
                                </Label>
                                <div className="relative mt-1 lg:w-64 xl:w-96">
                                    <TextInput
                                        id="users-search"
                                        name="users-search"
                                        placeholder="Search defaulter by badge"
                                        onChange={(e) => {
                                            filterByBadge(e.target.value);
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" hoverable>
                    <Table.Head >
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                            ID
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600 text-center">
                            Photo
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                            Full Name
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                            Badge
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                            Ref. Number
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                            Credit Total
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className=" bg-gray-200 dark:bg-gray-600">
                            Unpaid Installments
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                            Credit Start Date
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                            Credit End Date
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                            ID Bank
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                            Date Created
                        </Table.HeadCell>
                        <Table.HeadCell scope="col" className="py-3 px-6 bg-gray-200 dark:bg-gray-600">
                            Status
                        </Table.HeadCell>
                    </Table.Head>

                    <Table.Body>
                        {currentRecords.map((row: CreditRecord) => (
                            <Table.Row key={row.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-white"
                            >
                                <Table.Cell className="p-4 whitespace-nowrap ">
                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        <div className="text-base font-semibold text-gray-900 dark:text-white">
                                            {row.id}
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                    <div className="flex">
                                        <div className="relative">
                                            <img
                                                src={row.photo ? `https://hr.glassmountainbpo.com/ap/employee/document/foto/${row.photo}` : 'No Picture'}
                                                alt="user"
                                                className='w-12 h-12 rounded-full object-cover'
                                            />
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span className="text-dark-800 font-semibold px-2 py-0.5 rounded dark:text-white">
                                            {row.name_}
                                        </span>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                    <span className="bg-gray-600 text-gray-100 font-semibold px-2 py-0.5 rounded-full dark:bg-pink-500 dark:text-gray-200">
                                        {row.badge}
                                    </span>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                    <span className="bg-gray-600 text-gray-100 font-semibold px-2 py-0.5 rounded-full dark:bg-primary-600 dark:from-green-500 dark:to-blue-700 dark:text-gray-200">
                                        {row.reference_number}
                                    </span>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                    ${row.credit_total}
                                </Table.Cell>
                                <Table.Cell className="whitespace-normal p-4 text-base font-medium text-gray-900 dark:text-white">
                                    {row.total_payment}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                    {formatDateHelper(row.credit_start_date)}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                    {formatDateHelper(row.credit_end_date)}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                    {row.id_bank}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                    {formatDateHelper(row.date_created)}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                                    {row.status_credit === 'Pending' ? (
                                        <a className="ml-2 mr-4 px-2 py-1 font-bold rounded-full bg-yellow-300 text-gray-700 flex text-sm">
                                            {row.status_credit}
                                        </a>
                                    ) : (
                                        <a className="ml-2 mr-4 px-2 py-1 font-bold rounded-full bg-green-500 text-white flex text-sm">
                                            {row.status_credit}
                                        </a>
                                    )}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>

                </Table>
            </div>
            <PaginationDefault
                recordsPerPage={recordsPerPage}
                totalRecords={filteredData.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </NavbarSidebarLayout2>

    )
}

export default Defaults