import './App.css';
import Stack from '../src/Stack';
import PatientLookup from './components/PatientLookup';

function App() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">MedAgent </h1>

      {/* Patient Search Component */}
      <PatientLookup />

      {/* StackAI Agent Embed */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2"> Ask Our AI Agent</h2>
        <Stack
          project="https://www.stack-ai.com/embed/46bf5b6a-9b4d-48f6-8a13-cdfc4fe58520/11da0c81-afe2-4ccd-b498-807bbde8e7f1/653fefcfcc37c0093d55e6a9"
          width={'35rem'}
          fixed={true}
        />
      </div>
    </div>
  );
}

export default App;
