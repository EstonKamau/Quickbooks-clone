export default function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center p-8">
      <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-800">
        Welcome to DataTrack: Your Insights, Amplified
      </h1>
      <p className="text-lg lg:text-xl text-gray-600 max-w-2xl text-center">
        Harness the power of data analytics to transform your business decisions. DataTrack empowers you to
        make informed choices with real-time insights, intuitive dashboards, and predictive analytics.
      </p>
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-semibold text-gray-700">Get Started with:</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>✔️ Streamlined Data Management</li>
          <li>✔️ Actionable Insights at Your Fingertips</li>
          <li>✔️ Predictive Modeling for Future Growth</li>
          <li>✔️ User-Friendly Dashboards Tailored to Your Needs</li>
        </ul>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-blue-300 to-transparent my-8" />
      <div className="flex gap-6 mt-6">
        <a
          href="#"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Start Your Journey
        </a>
        <a
          href="#"
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-300 transition"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
