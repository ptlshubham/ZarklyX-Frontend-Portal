import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="container-fluid px-0">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h3 class="card-title mb-0">
            <i class="ki-filled ki-shield-tick me-2"></i>
            Super Admin Dashboard
          </h3>
        </div>
        <div class="card-body">
          <div class="row g-4">
            <div class="col-md-6 col-xl-3">
              <div class="card bg-light-primary">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <i class="ki-filled ki-users text-primary fs-2x me-3"></i>
                    <div>
                      <div class="fs-2 fw-bold text-dark">1,247</div>
                      <div class="fs-7 text-muted">Total Users</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-6 col-xl-3">
              <div class="card bg-light-success">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <i class="ki-filled ki-chart-line-up text-success fs-2x me-3"></i>
                    <div>
                      <div class="fs-2 fw-bold text-dark">99.8%</div>
                      <div class="fs-7 text-muted">System Uptime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-6 col-xl-3">
              <div class="card bg-light-warning">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <i class="ki-filled ki-security-check text-warning fs-2x me-3"></i>
                    <div>
                      <div class="fs-2 fw-bold text-dark">0</div>
                      <div class="fs-7 text-muted">Security Alerts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-6 col-xl-3">
              <div class="card bg-light-info">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <i class="ki-filled ki-server text-info fs-2x me-3"></i>
                    <div>
                      <div class="fs-2 fw-bold text-dark">2.3GB</div>
                      <div class="fs-7 text-muted">Storage Used</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="row g-4 mt-3">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">System Overview</h4>
                </div>
                <div class="card-body">
                  <p class="text-muted mb-4">Welcome to the Super Admin Dashboard. This is a completely different layout with admin-specific navigation and controls.</p>
                  
                  <div class="alert alert-success">
                    <div class="d-flex align-items-center">
                      <i class="ki-filled ki-check-circle me-2"></i>
                      <div>
                        <div class="fw-bold">Layout System Active</div>
                        <div class="small">You're now using the Super Admin layout with different header and sidebar menus.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="alert alert-info">
                    <div class="d-flex align-items-center">
                      <i class="ki-filled ki-information me-2"></i>
                      <div>
                        <div class="fw-bold">Navigation</div>
                        <div class="small">Access: /admin/dashboard | Return to user view: /dashboard</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent {

}