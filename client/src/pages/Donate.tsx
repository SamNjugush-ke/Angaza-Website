import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type DonationAmount = 500 | 1000 | 2500 | 5000 | 10000 | null;
type PaymentMethod = "paystack" | "pesapal" | null;

export default function Donate() {
  const [amount, setAmount] = useState<DonationAmount>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const finalAmount = customAmount ? parseInt(customAmount) : amount;

  const handleDonate = async () => {
    if (!finalAmount || finalAmount < 100) {
      toast.error("Please enter a valid amount (minimum KES 100)");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (!donorName || !donorEmail) {
      toast.error("Please fill in your name and email");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate donation creation
      // In production, this would call the backend API
      toast.success("Redirecting to payment gateway...");

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        toast.success("Thank you for your generous donation!");
        // Reset form
        setAmount(null);
        setCustomAmount("");
        setPaymentMethod(null);
        setDonorName("");
        setDonorEmail("");
        setDonorPhone("");
        setMessage("");
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-red-50 to-background dark:from-red-950/20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block bg-red-100 dark:bg-red-950/50 rounded-full p-4 mb-6">
              <Heart className="text-red-600 dark:text-red-400" size={32} />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">Support Our Mission</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your donation directly supports STEM education, MSME training, and digital economy participation across Africa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { amount: "KES 500", impact: "Provides 1 student with bootcamp materials" },
              { amount: "KES 1,000", impact: "Supports 1 SIYB training participant" },
              { amount: "KES 5,000", impact: "Equips 1 STEM Hub workstation" },
              { amount: "KES 10,000", impact: "Sponsors 5 students for full bootcamp" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-xl p-6 text-center"
              >
                <p className="text-3xl font-bold text-primary mb-2">{item.amount}</p>
                <p className="text-muted-foreground text-sm">{item.impact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-8">Make Your Donation</h2>

              {/* Amount Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-foreground mb-4">Select Amount (KES)</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        setAmount(preset as DonationAmount);
                        setCustomAmount("");
                      }}
                      className={`p-3 rounded-lg font-semibold transition-colors ${
                        amount === preset
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border hover:border-primary text-foreground"
                      }`}
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    placeholder="Or enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(null);
                    }}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    min="100"
                  />
                  <span className="absolute right-4 top-3 text-muted-foreground">KES</span>
                </div>
              </div>

              {/* Donor Information */}
              <div className="mb-8 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="+254..."
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share why you're supporting Angaza..."
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-foreground mb-4">Payment Method *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod("paystack")}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      paymentMethod === "paystack"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div className="font-bold text-foreground">Paystack</div>
                    <div className="text-sm text-muted-foreground">Card, M-Pesa, Bank Transfer</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("pesapal")}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      paymentMethod === "pesapal"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div className="font-bold text-foreground">Pesapal</div>
                    <div className="text-sm text-muted-foreground">Multiple Payment Options</div>
                  </button>
                </div>
              </div>

              {/* Info Box */}
              <div className="mb-8 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4 flex gap-3">
                <AlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Tax Deductible</p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Angaza Future International is a registered NGO. Your donation may be tax-deductible. A receipt will be sent to your email.
                  </p>
                </div>
              </div>

              {/* Donate Button */}
              <Button
                onClick={handleDonate}
                disabled={isProcessing || !finalAmount || !paymentMethod}
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart size={20} className="mr-2" />
                    Donate KES {finalAmount?.toLocaleString() || "0"}
                  </>
                )}
              </Button>

              {/* Security Note */}
              <p className="text-xs text-muted-foreground text-center mt-4">
                🔒 Your payment information is secure and encrypted
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "Is my donation secure?",
                a: "Yes, all donations are processed through secure payment gateways (Paystack and Pesapal) with bank-level encryption.",
              },
              {
                q: "Will I receive a receipt?",
                a: "Yes, a donation receipt will be sent to your email immediately after successful payment.",
              },
              {
                q: "Can I make recurring donations?",
                a: "Yes, you can set up monthly recurring donations. Contact info@angazafuture.org for details.",
              },
              {
                q: "What currency do you accept?",
                a: "We primarily accept Kenyan Shillings (KES). International donors can convert to KES through their banks.",
              },
              {
                q: "How is my donation used?",
                a: "Donations support STEM bootcamps, SIYB training, MSME Lab development, and operational costs. Detailed reports are available on request.",
              },
              {
                q: "Can I donate anonymously?",
                a: "Yes, you can donate without providing a name. However, email is required for the receipt.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-background border border-border rounded-lg p-6"
              >
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
