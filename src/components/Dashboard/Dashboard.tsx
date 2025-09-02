import Navigation from "@/components/Navigation";
import DataVisualization from "@/components/Dashboard/DataVisualization"
import Oceanmap from "@/components/Dashboard/Oceanmap"
import Footer from "@/components/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div id="map">
          <Oceanmap />
        </div>
        <div id="DataVisualization">
          <DataVisualization />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
