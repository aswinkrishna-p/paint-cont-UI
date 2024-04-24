import React from 'react';
import ClientNav from '../../Components/Client/ClientNav';

function PainterProfile() {
    return (
      <>
        <ClientNav />
        <div className="flex h-full flex-col bg-deep-orange-900">
          <div className=" pt-8 w-full ">
            <div className="flex flex-col gap-6 mt-7 w-full">
              {/* Profile Section */}
              <div className=" relative  mb-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col items-start">
                    <img
                      src="/profileIcon.png"
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      alt="Profile"
                    />{" "}
                    <h1 className="text-xl font-bold">Painter Name</h1>
                    <p className="text-gray-700">Professional Painter</p>
                    <p className="text-gray-700">Location:Kerala ,Calicut</p>
                    <p className="text-gray-700">Phone:2345362346345</p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                      <a
                        href="#"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                      >
                        Follow
                      </a>
                      <a
                        href="#"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                      >
                        Message
                      </a>
                    </div>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex ">
                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                      specialised :
                    </span>
                    <ul className='flex '>
                      <li className="mb-2 ml-4">#interior</li>
                      <li className="mb-2 ml-4">#interior</li>
                      <li className="mb-2 ml-4">#interior</li>
                      <li className="mb-2 ml-4">#interior</li>
                      <li className="mb-2 ml-4">#interior</li>
                      <li className="mb-2 ml-4">#interior</li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
                        {/* About Me Section */}
                        <div className="flex flex-col ">
                <div className="bg-[#0D0E26] shadow rounded-lg p-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">About Me</h2>
                  </div>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit.
                    Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis
                    in faucibus orci luctus et ultrices posuere cubilia Curae;
                    Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
                    luctus risus rhoncus id.
                  </p>
  
                  <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                  <div className="mb-6">
                    <div className="flex justify-between flex-wrap gap-2 w-full">
                      <span className="text-gray-700 font-bold">
                        Web Developer
                      </span>
                      <p>
                        <span className="text-gray-700 mr-2">at ABC Company</span>
                        <span className="text-gray-700">2017 - 2019</span>
                      </p>
                    </div>
                    <p className="mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      finibus est vitae tortor ullamcorper, ut vestibulum velit
                      convallis. Aenean posuere risus non velit egestas suscipit.
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between flex-wrap gap-2 w-full">
                      <span className="text-gray-700 font-bold">
                        Web Developer
                      </span>
                      <p>
                        <span className="text-gray-700 mr-2">at ABC Company</span>
                        <span className="text-gray-700">2017 - 2019</span>
                      </p>
                    </div>
                    <p className="mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      finibus est vitae tortor ullamcorper, ut vestibulum velit
                      convallis. Aenean posuere risus non velit egestas suscipit.
                    </p>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between flex-wrap gap-2 w-full">
                      <span className="text-gray-700 font-bold">
                        Web Developer
                      </span>
                      <p>
                        <span className="text-gray-700 mr-2">at ABC Company</span>
                        <span className="text-gray-700">2017 - 2019</span>
                      </p>
                    </div>
                    <p className="mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      finibus est vitae tortor ullamcorper, ut vestibulum velit
                      convallis. Aenean posuere risus non velit egestas suscipit.
                    </p>
                  </div>
                </div>
              </div>
        </div>
      </>
    );
}

export default PainterProfile;
