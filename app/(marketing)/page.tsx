import { Footer } from "./_components/footer";
import Heading from "./_components/heading";
import { Heroes } from "./_components/heroes";

const MarketingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl text-center space-y-8 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
  