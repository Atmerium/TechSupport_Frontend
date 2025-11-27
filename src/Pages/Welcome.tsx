import LoginModal from "./LoginModal";

const Welcome = () => {
    return (
        <>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Welcome to TechSupport</h1>
                    <p className="col-md-8 fs-4">Your one-stop solution for all technical issues. We provide fast and reliable support to get you back on track.</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button className="btn btn-primary btn-lg" type="button">Create New Ticket</button>
                        <button className="btn btn-outline-secondary btn-lg" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <LoginModal />
        </>
    );
};

export default Welcome;
