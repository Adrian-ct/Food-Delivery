import MainContainer from "../components/MainContainer";
export default function Home() {
  return (
    <div className="w-screen h-auto flex flex-col bg-primary">
      <main className="mt-16 md:mt-20 px-4 md:px-13 lg:px-16 py-4 w-full">
        <MainContainer />
      </main>
    </div>
  );
}
