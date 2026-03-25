import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

type EventStatus = "all" | "upcoming" | "ongoing" | "completed" | "cancelled";

export default function Events() {
  const [selectedStatus, setSelectedStatus] = useState<EventStatus>("all");
  
  // Fetch events from database
  const { data: events = [], isLoading } = trpc.admin.public.events.useQuery();

  // Filter events based on selected status
  const filteredEvents = useMemo(() => {
    if (selectedStatus === "all") return events;
    return events.filter(event => event.status === selectedStatus);
  }, [events, selectedStatus]);

  // Group events by status for stats
  const stats = useMemo(() => ({
    total: events.length,
    upcoming: events.filter(e => e.status === "upcoming").length,
    ongoing: events.filter(e => e.status === "ongoing").length,
    completed: events.filter(e => e.status === "completed").length,
  }), [events]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const statusColors: Record<string, { bg: string; text: string; badge: string }> = {
    upcoming: { bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
    ongoing: { bg: "bg-green-50", text: "text-green-700", badge: "bg-green-100 text-green-700" },
    completed: { bg: "bg-gray-50", text: "text-gray-700", badge: "bg-gray-100 text-gray-700" },
    cancelled: { bg: "bg-red-50", text: "text-red-700", badge: "bg-red-100 text-red-700" },
  };

  const getStatusColor = (status: string | null) => {
    if (!status) return statusColors.upcoming;
    return statusColors[status] || statusColors.upcoming;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Events & Bootcamps</h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Join our intensive bootcamps, workshops, and training programs designed to empower entrepreneurs and professionals with cutting-edge skills.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Events", value: stats.total, color: "text-teal-600" },
              { label: "Upcoming", value: stats.upcoming, color: "text-blue-600" },
              { label: "Ongoing", value: stats.ongoing, color: "text-green-600" },
              { label: "Completed", value: stats.completed, color: "text-gray-600" },
            ].map((stat, i) => (
              <Card key={i} className="p-4 text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-semibold text-gray-600">Filter by Status:</span>
            {(["all", "upcoming", "ongoing", "completed", "cancelled"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedStatus === status
                    ? "bg-teal-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Events List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">No events found for this status.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {filteredEvents.map((event) => {
                const colors = getStatusColor(event.status || "upcoming");
                const startDate = new Date(event.startDate);
                const endDate = new Date(event.endDate);
                const formattedDate = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;

                return (
                  <motion.div key={event.eventId} variants={itemVariants}>
                    <Card className={`p-6 hover:shadow-lg transition-shadow ${colors.bg}`}>
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        {event.imageUrl && (
                          <div className="md:w-48 h-40 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}>
                                  {(event.status || "upcoming").charAt(0).toUpperCase() + (event.status || "upcoming").slice(1)}
                                </span>
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700">
                                  {event.category}
                                </span>
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                                  {event.type}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{event.description}</p>

                          {/* Event Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Calendar className="w-5 h-5 text-teal-600" />
                              <span className="text-sm">{formattedDate}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="w-5 h-5 text-teal-600" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                            )}
                            {event.capacity && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <Users className="w-5 h-5 text-teal-600" />
                                <span className="text-sm">
                                  {event.registeredCount || 0} / {event.capacity} registered
                                </span>
                              </div>
                            )}
                          </div>

                          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                            Learn More <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
