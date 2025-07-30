import { Button } from "antd";

const Change_Password = () => {
    return (
        <div>
             <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Change Password
          </h2>
          <div className="grid grid-cols-1 gap-y-4">
            {["Current", "New", "Confirm"].map((label, i) => (
              <div className="mb-4" key={i}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label} Password
                </label>
                <Input.Password
                  placeholder={`${label} Password`}
                  size="large"
                  className="custom-input"
                />
              </div>
            ))}
          </div>
          <div className="flex space-x-4 mt-6">
            <Button
              type="primary"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 20px",
                height: "auto",
                fontWeight: 600
              }}
              className="save-now-btn"
            >
              Save Now
            </Button>
            <Button
              type="default"
              className="bg-white text-gray-800 hover:bg-gray-100 border-gray-300 rounded-md px-6 py-2 h-auto font-semibold"
            >
              Not Now
            </Button>
          </div>
        </div>
        </div>
    );
};

export default Change_Password;