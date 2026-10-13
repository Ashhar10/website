import React, { useState, useEffect } from 'react';
import { useCompanySettings, type CompanySettings } from '../../../lib/companySettings';

export const CompanyProfileTab: React.FC = () => {
  const { companySettings, updateCompanySettings } = useCompanySettings();

  const [formData, setFormData] = useState<CompanySettings>(companySettings);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(companySettings);
  }, [companySettings]);

  const handleChange = (field: keyof CompanySettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaveSuccess(false);
    setSaveError(null);
  };

  // Convert uploaded logo file to Base64 data URL so it displays across all platforms
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Logo file size should be less than 2 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleChange('company_logo_url', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await updateCompanySettings(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setSaveError(err?.message || 'Failed to update company profile settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaultLogo = () => {
    handleChange('company_logo_url', '/icons/logo.png');
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px' }} className="company-profile-tab">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(37, 99, 235, 0.05))',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '14px',
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--border-color, #e2e8f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '6px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}>
            <img 
              src={formData.company_logo_url || '/icons/logo.png'} 
              alt="Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => { (e.target as any).src = '/icons/logo.png'; }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
              {formData.company_name || 'Company Profile & Branding'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Customize app title, company name, logo, contact info, and branding. Changes reflect on Web, Windows & Android for all users and employees.
            </p>
          </div>
        </div>

        {/* Live Topbar Preview Pill */}
        <div style={{
          background: 'var(--card-bg, #1e293b)',
          padding: '8px 16px',
          borderRadius: '10px',
          border: '1px solid var(--border-color, #334155)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
            Live Preview:
          </span>
          <img 
            src={formData.company_logo_url || '/icons/logo.png'} 
            alt="Preview" 
            style={{ width: '28px', height: '28px', objectFit: 'contain' }}
            onError={(e) => { (e.target as any).src = '/icons/logo.png'; }}
          />
          <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            {formData.company_name || 'ELIPSE HR'}
          </strong>
        </div>
      </div>

      {saveSuccess && (
        <div style={{
          backgroundColor: 'rgba(34, 197, 94, 0.15)',
          color: '#15803d',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          padding: '12px 18px',
          borderRadius: '10px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 600
        }}>
          ✓ Company profile & branding saved successfully! All platforms and employee portals have been updated in real-time.
        </div>
      )}

      {saveError && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#b91c1c',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '12px 18px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          ⚠️ {saveError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* Card 1: Core Branding */}
          <div style={{
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: 0, marginBottom: '18px', borderBottom: '1px solid var(--border-color, #e2e8f0)', paddingBottom: '10px' }}>
              🏢 App & Company Identity
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
                Company Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.company_name}
                onChange={e => handleChange('company_name', e.target.value)}
                placeholder="e.g. Acme Corporation"
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color, #cbd5e1)' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Displayed in the main top bar, employee dashboard, and letterheads.
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
                App / Portal Title
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.app_title}
                onChange={e => handleChange('app_title', e.target.value)}
                placeholder="e.g. Acme HR Portal"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color, #cbd5e1)' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Displayed in browser tab titles and mobile app header.
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
                Tagline / Subtitle
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.company_tagline}
                onChange={e => handleChange('company_tagline', e.target.value)}
                placeholder="e.g. Secure Attendance & HR Management Portal"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color, #cbd5e1)' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
                Default Currency Symbol
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.currency_symbol}
                onChange={e => handleChange('currency_symbol', e.target.value)}
                placeholder="e.g. Rs, $, PKR, AED, EUR, £"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color, #cbd5e1)' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Used on payroll statements, salary calculations, and employee payslips.
              </span>
            </div>
          </div>

          {/* Card 2: Company Logo & Appearance */}
          <div style={{
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: 0, marginBottom: '18px', borderBottom: '1px solid var(--border-color, #e2e8f0)', paddingBottom: '10px' }}>
              🎨 Company Logo & Icon
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '18px' }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '14px',
                border: '2px dashed var(--border-color, #cbd5e1)',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.02)'
              }}>
                <img 
                  src={formData.company_logo_url || '/icons/logo.png'} 
                  alt="Logo Preview" 
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={(e) => { (e.target as any).src = '/icons/logo.png'; }}
                />
              </div>

              <div>
                <label 
                  className="btn btn-primary"
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  📁 Upload New Logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <div>
                  <button
                    type="button"
                    onClick={handleResetDefaultLogo}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary, #3b82f6)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline'
                    }}
                  >
                    Reset to Default Logo
                  </button>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
                Or Custom Logo URL
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.company_logo_url}
                onChange={e => handleChange('company_logo_url', e.target.value)}
                placeholder="https://yourdomain.com/logo.png"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color, #cbd5e1)' }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                PNG or SVG with transparent background recommended.
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
                Standard Work Days Per Week
              </label>
              <select
                className="form-control"
                value={formData.office_working_days || 6}
                onChange={e => handleChange('office_working_days', parseInt(e.target.value, 10))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color, #cbd5e1)' }}
              >
                <option value={5}>5 Days (Mon - Fri)</option>
                <option value={6}>6 Days (Mon - Sat)</option>
                <option value={7}>7 Days (All Week)</option>
              </select>
            </div>
          </div>

          {/* Card 3: Contact & Address */}
          <div style={{
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: '14px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            gridColumn: '1 / -1'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: 0, marginBottom: '18px', borderBottom: '1px solid var(--border-color, #e2e8f0)', paddingBottom: '10px' }}>
              📍 Company Contact & Headquarters Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
                  Official Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.company_email}
                  onChange={e => handleChange('company_email', e.target.value)}
                  placeholder="hr@yourcompany.com"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color, #cbd5e1)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  value={formData.company_phone}
                  onChange={e => handleChange('company_phone', e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color, #cbd5e1)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
                  Company Website
                </label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.company_website}
                  onChange={e => handleChange('company_website', e.target.value)}
                  placeholder="https://yourcompany.com"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color, #cbd5e1)' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
                Office / Headquarters Address
              </label>
              <textarea
                className="form-control"
                rows={3}
                value={formData.company_address}
                onChange={e => handleChange('company_address', e.target.value)}
                placeholder="Building Name, Street, City, Country"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color, #cbd5e1)' }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{
              padding: '12px 28px',
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '10px',
              cursor: saving ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
            }}
          >
            {saving ? 'Saving Changes...' : '💾 Save Company Profile & Branding'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfileTab;
