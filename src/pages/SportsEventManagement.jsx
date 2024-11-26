import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiPrinter,
  FiMenu,
  FiX,
} from "react-icons/fi";

const SportsEventManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventCategory: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Dummy data for events
  const [events, setEvents] = useState([
    { id: 1, name: "Marathon 2024", date: "2024-03-15", category: "Running" },
    {
      id: 2,
      name: "Swimming Championship",
      date: "2024-04-20",
      category: "Swimming",
    },
    {
      id: 3,
      name: "Basketball Tournament",
      date: "2024-05-10",
      category: "Team Sports",
    },
  ]);

  // Dummy data for participants
  useEffect(() => {
    const dummyParticipants = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Participant ${i + 1}`,
      email: `participant${i + 1}@example.com`,
      phone: `+1234567${i.toString().padStart(4, "0")}`,
      eventCategory: i % 2 === 0 ? "Running" : "Swimming",
    }));
    setParticipants(dummyParticipants);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Invalid email format";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.eventCategory)
      errors.eventCategory = "Event category is required";
    return errors;
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setParticipants([
        ...participants,
        { ...formData, id: participants.length + 1 },
      ]);
      setFormData({ name: "", email: "", phone: "", eventCategory: "" });
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const EventModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Event Name"
            className="w-full p-2 border rounded"
          />
          <input type="date" className="w-full p-2 border rounded" />
          <select className="w-full p-2 border rounded">
            <option value="">Select Category</option>
            <option value="Running">Running</option>
            <option value="Swimming">Swimming</option>
            <option value="Team Sports">Team Sports</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowEventModal(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
              >
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <span className="ml-2 text-xl font-bold">
                Sports Event Manager
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full p-2 text-left rounded ${
                activeTab === "dashboard"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("registration")}
              className={`w-full p-2 text-left rounded ${
                activeTab === "registration"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              Registration
            </button>
            <button
              onClick={() => setActiveTab("participants")}
              className={`w-full p-2 text-left rounded ${
                activeTab === "participants"
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              Participants
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                  Event Management Dashboard
                </h1>
                <button
                  onClick={() => setShowEventModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <FiPlus className="mr-2" /> Create Event
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                    <p className="text-gray-600 mb-4">{event.date}</p>
                    <p className="text-gray-500 mb-4">{event.category}</p>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <FiEdit2 />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "registration" && (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">
                Participant Registration
              </h2>
              <form onSubmit={handleRegistration} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full p-2 border rounded ${
                      formErrors.name ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full p-2 border rounded ${
                      formErrors.email ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full p-2 border rounded ${
                      formErrors.phone ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    value={formData.eventCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        eventCategory: e.target.value,
                      })
                    }
                    className={`w-full p-2 border rounded ${
                      formErrors.eventCategory ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Event Category</option>
                    <option value="Running">Running</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Team Sports">Team Sports</option>
                  </select>
                  {formErrors.eventCategory && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.eventCategory}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Register
                </button>
              </form>
            </div>
          )}

          {activeTab === "participants" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Participants List</h2>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center"
                >
                  <FiPrinter className="mr-2" /> Print List
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {participants
                      .slice((currentPage - 1) * 10, currentPage * 10)
                      .map((participant) => (
                        <tr key={participant.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {participant.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {participant.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {participant.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {participant.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {participant.eventCategory}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from(
                  { length: Math.ceil(participants.length / 10) },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {showEventModal && <EventModal />}
    </div>
  );
};

export default SportsEventManagement;
