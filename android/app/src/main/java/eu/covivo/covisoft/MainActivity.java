package eu.covivo.covisoft;

import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.google.firebase.FirebaseApp;

import java.util.ArrayList;


public class MainActivity extends BridgeActivity {
  private static final String TAG = "MyActivity";

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

      // Log.d(TAG, "Initializing the default FirebaseApp ");
    // FirebaseApp.initializeApp(this);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});
  }
}
