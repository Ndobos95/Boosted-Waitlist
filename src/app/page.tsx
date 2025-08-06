"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, MessageCircle, Star, Users, Target } from "lucide-react"

export default function Home() {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (response.ok) {
                setIsSubmitted(true)
                // Track analytics event
                if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'signup', {
                        event_category: 'waitlist',
                        event_label: 'email_signup'
                    })
                }
            } else {
                if (data.alreadyRegistered) {
                    setError("You're already on our waitlist! Check your email for confirmation.")
                } else {
                    setError(data.error || 'Something went wrong. Please try again.')
                }
            }
        } catch (err) {
            setError('Network error. Please check your connection and try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-br from-orange-600 to-amber-700 bg-clip-text text-transparent">
                                Boosted
                            </h1>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8">
                            Supercharge Your Band Booster{" "}
                            <span className="bg-gradient-to-br from-orange-600 to-amber-700 bg-clip-text text-transparent">
                                Fundraising
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            The all-in-one platform designed specifically for band boosters to streamline fundraising,
                            simplify payment collection, and enhance parent-student communication.
                        </p>

                        {/* Waitlist Form */}
                        <div className="max-w-md mx-auto mb-16">
                            {!isSubmitted ? (
                                <>
                                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 h-12 text-base"
                                            required
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="h-12 px-8 bg-gradient-to-br from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Joining..." : "Join Waitlist"}
                                        </Button>
                                    </form>

                                    {error && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                                            <p className="text-red-700 text-sm">{error}</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                    <h3 className="text-green-800 font-semibold mb-2">You're on the list! 🎉</h3>
                                    <p className="text-green-700 mb-2">We'll notify you when Boosted launches. No spam, ever.</p>
                                    <p className="text-green-600 text-sm">Check your email for a confirmation message!</p>
                                </div>
                            )}

                            {!isSubmitted && !error && (
                                <p className="text-sm text-gray-500 mt-3">
                                    Get notified when we launch. No spam, ever.
                                </p>
                            )}
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>500+ Interested Parents</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                <span>Built for Band Boosters</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Everything You Need in One Platform
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Stop juggling multiple tools and spreadsheets. Manage all your band booster activities in one place.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
                                    <DollarSign className="h-8 w-8 text-white" />
                                </div>
                                <CardTitle className="text-xl font-semibold">Smart Fundraising</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <CardDescription className="text-base leading-relaxed">
                                    Launch campaigns, track progress, and manage multiple fundraising initiatives with powerful analytics and automated reporting.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4">
                                    <CreditCard className="h-8 w-8 text-white" />
                                </div>
                                <CardTitle className="text-xl font-semibold">Seamless Payments</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <CardDescription className="text-base leading-relaxed">
                                    Accept online payments, manage installments, and provide parents with easy payment tracking and receipt management.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="text-center pb-4">
                                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
                                    <MessageCircle className="h-8 w-8 text-white" />
                                </div>
                                <CardTitle className="text-xl font-semibold">Enhanced Communication</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <CardDescription className="text-base leading-relaxed">
                                    Send targeted notifications, share updates, and keep parents informed with integrated messaging and announcement tools.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Built by Band Boosters, for Band Boosters
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        We understand the challenges of managing band booster activities. That's why we're creating a solution that addresses the real pain points you face every day.
                    </p>

                    <div className="flex flex-col items-center">
                        <div className="space-y-4">
                            {[
                                "Reduce administrative burden by 70%",
                                "Increase fundraising efficiency",
                                "Improve parent engagement and participation",
                                "Streamline communication across all stakeholders"
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <Star className="h-3 w-3 text-white fill-current" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-bold bg-gradient-to-br from-orange-600 to-amber-700 bg-clip-text text-transparent">
                                Boosted
                            </h3>
                            <p className="text-gray-600 mt-2">Empowering band boosters nationwide</p>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-gray-500 text-sm">
                                &copy; 2025 Boosted. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
