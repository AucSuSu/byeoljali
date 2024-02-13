import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Web/Stores/store.js';
import AppRoutes from './AppRoutes.js';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
          
      </PersistGate>
    </Provider>
  );
}
