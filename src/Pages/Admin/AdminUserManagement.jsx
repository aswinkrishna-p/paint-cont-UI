import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import AdminNav from "../../Components/Admin/AdminNav";
import { useEffect, useState } from "react";
import { BlockUser, getUsers } from "../../api/adminApi";
import toast, {Toaster} from 'react-hot-toast'

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [change , setChange]= useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data.users.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [change]);


  const handlechangeUserBlock = async(userId) =>{
    console.log(userId);
    const response = await BlockUser(userId)
    if(response.success){
      toast.success('successful')
      setChange(!change)
    }
  }

  return (
    <div className="flex bg-black">
      <AdminNav />
      <Toaster/>
      <Card className="m-5 bg-[#0D0E26] h-[94vh] w-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-[#0D0E26]"
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Members list
              </Typography>
              <Typography color="white" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                view all
              </Button>
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-hidden px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    UserName
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  </Typography>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    Email
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  </Typography>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    Status
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  </Typography>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    Actions
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  </Typography>
                </th>
                {/* <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"></th> */}
              </tr>
            </thead>
            <tbody>
              {users.map(({ _id, username, email, isBlocked},index) => (
                <tr key={_id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Avatar src={''} alt={username} size="sm" />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="white"
                          className="font-normal"
                        >
                          {username}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={isBlocked ? "Blocked" : "Unblocked"}
                        color={isBlocked ? "red" : "green"}
                      />
                    </div>
                  </td>
                  {/* <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {'date'}
                    </Typography>
                  </td> */}
                  <td className="p-4 border-b border-blue-gray-50">
                    <Tooltip content="Edit User">
                      <IconButton variant="text" onClick={() =>handlechangeUserBlock(_id)}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="white" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" color="white">
              Previous
            </Button>
            <Button variant="outlined" size="sm" color="white">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AdminUserManagement;
