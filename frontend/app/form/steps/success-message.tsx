export default function SuccessMessage() {
    return (
      <div className="text-center py-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Application Submitted Successfully!</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Thank you for completing your application. We have received your information and will review it shortly.
        </p>
        <div className="bg-muted p-4 rounded-lg inline-block text-left">
          <p className="font-medium mb-1">What happens next?</p>
          <ol className="list-decimal pl-5 text-sm text-muted-foreground space-y-1">
            <li>Our team will review your application within 5-7 business days</li>
            <li>You will receive an email confirmation with your application reference number</li>
            <li>We may contact you if additional information is required</li>
            <li>Once the review is complete, you will be notified of the decision</li>
          </ol>
        </div>
      </div>
    )
  }
  