import React, { useState } from "react";
import { Card } from "../../components/shared/Card";
import { Button } from "../../components/shared/Button";
import { Toast } from "../../components/shared/Toast";

export default function SettingsPage() {
  const [showSaved, setShowSaved] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [autoSave, setAutoSave]     = useState(false);

  const handleSave = () => setShowSaved(true);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text">Settings</h1>
        <p className="text-body text-muted mt-1">Manage your account and notification preferences.</p>
      </div>

      {showSaved && (
        <div className="mb-6">
          <Toast message="Settings saved." type="success" onDismiss={() => setShowSaved(false)} />
        </div>
      )}

      <div className="flex flex-col gap-5 max-w-xl">
        {/* Profile stub */}
        <Card>
          <h2 className="text-h3 font-semibold text-text mb-4">Profile</h2>
          <div className="flex flex-col gap-4">
            <FormField id="name" label="Full name" defaultValue="John Doe" />
            <FormField id="email" label="Email address" defaultValue="john.doe@example.com" type="email" />
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <h2 className="text-h3 font-semibold text-text mb-4">Notifications</h2>
          <div className="flex flex-col gap-4">
            <Toggle
              id="email-notifs"
              label="Email notifications"
              description="Receive a summary email after each analysis."
              checked={emailNotifs}
              onChange={setEmailNotifs}
            />
            <Toggle
              id="auto-save"
              label="Auto-save analyses"
              description="Automatically save each analysis to your history."
              checked={autoSave}
              onChange={setAutoSave}
            />
          </div>
        </Card>

        {/* Data */}
        <Card>
          <h2 className="text-h3 font-semibold text-text mb-4">Data</h2>
          <p className="text-sm text-muted mb-4">
            Delete all your resume data and analysis history from ResumeIQ servers permanently.
            This action cannot be undone.
          </p>
          <Button variant="danger" size="sm">Delete all data</Button>
        </Card>

        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave}>Save changes</Button>
        </div>
      </div>
    </div>
  );
}

function FormField({ id, label, type = "text", defaultValue }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text mb-1.5">{label}</label>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text placeholder-muted transition-colors duration-150 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function Toggle({ id, label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-text">{label}</label>
        <p className="text-caption text-muted mt-0.5">{description}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative shrink-0 w-10 h-6 rounded-full border transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          checked ? "bg-primary border-primary" : "bg-background border-border",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-150",
            checked ? "translate-x-4" : "translate-x-0",
          ].join(" ")}
        />
        <span className="sr-only">{label}</span>
      </button>
    </div>
  );
}
